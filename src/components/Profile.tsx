import { motion } from "framer-motion";
import { Brain, Code, Users, Cpu } from "lucide-react";

const highlights = [
  { icon: Brain, label: "AI & ML Specialization" },
  { icon: Code, label: "Strong DSA & Core CS" },
  { icon: Cpu, label: "MERN Stack Developer" },
  { icon: Users, label: "Leadership & Team Management" },
];

const Profile = () => {
  return (
    <section id="about" className="section-container bg-background-secondary">
      {/* Gradient accent */}
      <div className="gradient-blob w-[400px] h-[400px] bg-cyber-teal/20 top-0 right-0 animate-pulse-glow" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Who Is This?</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Harshit Singh Shekhawat
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-secondary-foreground leading-relaxed">
              I'm a 3rd-year Computer Science student specializing in{" "}
              <span className="text-foreground font-medium">Artificial Intelligence & Machine Learning</span> at VIT 
              with a CGPA of <span className="text-neon-green font-mono font-semibold">8.90</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I focus on building production-ready platforms, intelligent systems, and scalable 
              architectures that combine strong CS fundamentals with applied AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="glass-card-hover p-6 space-y-3"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-sm text-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
