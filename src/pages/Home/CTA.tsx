import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { motion, type Variants } from "framer-motion";
import { MapPinned } from "lucide-react";
import { Link } from "react-router";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CTA() {
  return (
    <section className="relative responsive-container py-12 md:py-16 px-4 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Card className="p-6 md:p-8">
            <div className="flex gap-4 justify-between items-center">
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-2">
                  Ready to start your voyage?
                </h4>

                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Test your anime knowledge and discover real-world locations
                </p>
              </div>
              <Button
                as={Link}
                to="/game?mode=quick-play"
                size="md"
                color="primary"
                endIcon={<MapPinned size={20} />}
                animate
              >
                Quick Play
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
