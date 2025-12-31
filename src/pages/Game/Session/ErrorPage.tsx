import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { motion, type Variants } from "framer-motion";
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
export default function ErrorPage({
  message = "Something happened",
  label = "Go Back Home",
  to = "/",
}: {
  message?: string | null;
  label?: ReactNode;
  to?: string;
}) {
  return (
    <section className="relative responsive-container py-12 md:py-16 px-4 bg-radial from-background-light to-background to-70% overflow-hidden min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scaleY: 0.95 }}
          whileInView={{
            opacity: [0, 0.7, 0.4, 0.9, 0.5],
            scaleY: [0.95, 1.02, 0.98, 1.04, 1],
          }}
          transition={{
            duration: 1.1,
            ease: "linear",
          }}
          className="absolute pointer-events-none top-8 -left-[100vw] w-[180vw] aspect-16/1 bg-radial from-primary-600/25 to-transparent to-60%"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative flex flex-col items-center justify-center"
        >
          <div></div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            Sorry...
          </h3>
          <p className="text-sm italic text-white/80">{message}</p>
          <div className="mt-8">
            <Button as={Link} to={to} size="md" color="primary" animate>
              {label}
            </Button>
          </div>
        </motion.div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-row gap-6 items-center justify-center bg-radial-[at_50%_100%] from-primary-600/30 to-transparent to-60%">
        <div className="opacity-90 -mr-6">
          <img src="/images/logo/logo-full-white.svg" width={108} />
        </div>
      </footer>
    </section>
  );
}
