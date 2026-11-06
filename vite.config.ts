import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const localChatFunction: Plugin = {
  name: "local-netlify-chat-function",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/.netlify/functions/chatbot", async (request, response) => {
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of request) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const { handler } = await server.ssrLoadModule("/netlify/functions/chatbot.js");
        const result = await handler({
          httpMethod: request.method || "GET",
          headers: request.headers,
          body: Buffer.concat(chunks).toString("utf8"),
        });

        response.statusCode = result.statusCode || 200;
        for (const [name, value] of Object.entries(result.headers || {})) {
          response.setHeader(name, String(value));
        }
        response.end(result.body || "");
      } catch (error) {
        console.error("[local-chat] Function handler failed:", error);
        response.statusCode = 500;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ message: "The local chat function failed. Check the development server output." }));
      }
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.OPENROUTER_API_KEY && !process.env.OPENROUTER_API_KEY) {
    process.env.OPENROUTER_API_KEY = env.OPENROUTER_API_KEY;
  }
  if (env.OPENROUTER_MODEL && !process.env.OPENROUTER_MODEL) {
    process.env.OPENROUTER_MODEL = env.OPENROUTER_MODEL;
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "development" && localChatFunction,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 750,
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-three": ["three"],
            "vendor-r3f": ["@react-three/fiber", "@react-three/drei"],
            "vendor-motion": ["framer-motion", "gsap"],
          },
        },
      },
    },
  };
});
