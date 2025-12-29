import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodingProfiles = () => {
  return (
    <section id="coding-profiles" className="section-container bg-background-secondary">
      <div className="gradient-blob w-[400px] h-[400px] bg-neon-green/20 top-1/2 -right-20 animate-pulse-glow" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Coding Activity</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Coding Profiles
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 glass-card-hover p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-neon-green text-lg">LC</span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">LeetCode</h3>
                  <p className="text-sm text-muted-foreground font-mono">@harshit_shekhawat</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://leetcode.com/u/harshit_shekhawat/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>

            {/* LeetCode Stats Embed */}
            <div className="relative rounded-lg overflow-hidden bg-background/50 p-4">
              <img
                src="https://leetcard.jacoblin.cool/harshit_shekhawat?theme=dark&font=JetBrains%20Mono&ext=heatmap"
                alt="LeetCode Stats"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* GitHub & LinkedIn Cards */}
          <div className="space-y-6">
            <motion.a
              href="https://github.com/Lawapaul"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card-hover p-6 flex items-center gap-4 group block"
            >
              <div className="w-14 h-14 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
                <Github className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold group-hover:text-primary transition-colors">GitHub</h3>
                <p className="text-sm text-muted-foreground font-mono">@Lawapaul</p>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/harshitshekhawat/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card-hover p-6 flex items-center gap-4 group block"
            >
              <div className="w-14 h-14 rounded-lg bg-[#0077B5]/10 flex items-center justify-center group-hover:bg-[#0077B5]/20 transition-colors">
                <Linkedin className="w-7 h-7 text-[#0077B5]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold group-hover:text-primary transition-colors">LinkedIn</h3>
                <p className="text-sm text-muted-foreground font-mono">@harshitshekhawat</p>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
