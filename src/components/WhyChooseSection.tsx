import { motion } from "framer-motion";
import { Zap, Layers, DollarSign, Smartphone, Headphones } from "lucide-react";

const features = [
  { icon: Zap, title: "HD Quality Streaming", desc: "Crystal clear picture quality up to 4K on all channels and content." },
  { icon: Layers, title: "2000+ Channels", desc: "Access live TV channels all around the USA in every category." },
  { icon: DollarSign, title: "Affordable Plans", desc: "Premium content at competitive prices with flexible subscription options." },
  { icon: Smartphone, title: "Easy Access", desc: "Download our app and watch on any device, anywhere, anytime." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer support team ready to help whenever you need." },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">Why Choose Smart Care TV?</h2>
          <p className="text-muted-foreground">Everything you need for the ultimate streaming experience</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/40"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
