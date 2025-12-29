import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import mascotImage from "@/assets/mascot.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="gradient-blob w-[600px] h-[600px] bg-gradient-to-r from-primary/40 to-destructive/40 -top-40 -right-40 animate-pulse-glow" />
      <div className="gradient-blob w-[500px] h-[500px] bg-gradient-to-r from-cyber-teal/30 to-neon-green/30 -bottom-40 -left-40 animate-pulse-glow animation-delay-400" />
      <div className="gradient-blob w-[300px] h-[300px] bg-primary/20 top-1/2 left-1/4 animate-float" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Background text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 left-0 font-heading text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter select-none pointer-events-none"
            >
              PORTFOLIO
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-secondary-foreground">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none"
            >
              <span className="gradient-text-orange">AI / ML</span>
              <br />
              <span className="text-foreground">ENGINEER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl text-balance"
            >
              Designing intelligent systems, scalable platforms, and real-world 
              AI solutions with strong engineering fundamentals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="group" asChild>
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <Link to="/resume">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right visual - Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow effect behind mascot */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-cyber-teal/20 to-neon-green/30 blur-3xl rounded-full scale-75" />
              
              {/* Mascot image */}
              <motion.img
                src={mascotImage}
                alt="AI Developer Mascot"
                className="relative z-10 w-full max-w-md drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Floating tech badges */}
              <motion.div
                className="absolute top-0 right-0 glass-card px-3 py-2 rounded-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="font-mono text-xs text-neon-green">Machine Learning</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-1/4 -left-4 glass-card px-3 py-2 rounded-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="font-mono text-xs text-primary">Full-Stack</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-10 right-0 glass-card px-3 py-2 rounded-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <span className="font-mono text-xs text-cyber-teal">Deep Learning</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
