import { motion, type Variants } from "framer-motion";
import { Users, HelpCircle, MapPin, Play } from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/utils/cn";

const stats = [
  {
    icon: Users,
    value: "10.000+",
    label: "Active Players",
  },
  {
    icon: HelpCircle,
    value: "50.000+",
    label: "Guesses Made",
  },
  {
    icon: MapPin,
    value: "3.000+",
    label: "Scenes",
  },
  {
    icon: Play,
    value: "500+",
    label: "Anime Series",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backInOut",
    },
  },
};

export default function HeroStats() {
  return (
    <section className="relative responsive-container z-40 -mt-8">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          className="grid grid-cols-2 gap-12 md:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              className="cursor-pointer"
            >
              <Card
                className={cn(
                  "flex items-center justify-center gap-4",
                  "px-5 py-4"
                )}
              >
                <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-5 w-5 text-white/90" />
                </div>
                <div className="leading-tight mb-0.5">
                  <div className="text-lg font-bold">{value}</div>
                  <div className="text-sm text-white/70">{label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
