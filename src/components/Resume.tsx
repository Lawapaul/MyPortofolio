import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resume = () => {
  return (
    <section id="resume" className="section-container">
      <div className="gradient-blob w-[400px] h-[400px] bg-cyber-teal/20 right-0 top-1/2 animate-pulse-glow" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Resume</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            My Resume
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-card-hover p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <FileText className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold">Harshit Singh Shekhawat</h3>
              <p className="text-muted-foreground">AI/ML Engineer • Full-Stack Developer</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="group" asChild>
                <a href="/resume.pdf" download="resume.pdf">
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://drive.google.com/file/d/1Old0kwTJO8apVmfwUNJ9Fg6cVYihQ-2U/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  View Online
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
