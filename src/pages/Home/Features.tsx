import { motion, type Variants } from "framer-motion";
import { Gamepad2, Globe } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const features = [
  {
    title: "Massive scene libraries",
    description:
      "From iconic Tokyo intersections to hidden countryside shrines, explore the real Japan through anime's lens.",
    src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop",
  },
  {
    title: "Many game modes to choose from",
    description:
      "Quick play for casual fun, daily challenges for regulars, or themed rounds featuring specific anime series, regions, prefectures, or even cities.",
    actions: [
      {
        label: "Explore Game Mode",
        icon: <Gamepad2 size={20} />,
        to: "/game-mode",
      },
    ],
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
  },
  {
    title: "Challenge your friends",
    description:
      "Compare scores, share your best guesses, and compete on global and friend leaderboards.",
    actions: [
      {
        label: "Explore Community",
        icon: <Globe size={20} />,
        to: "/community",
      },
    ],
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
  },
  {
    title: "Real anime tourism",
    description:
      "Learn the actual locations and stories behind famous anime scenes.",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
  },
];

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

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Features() {
  return (
    <section className="relative responsive-container py-12 md:py-16 px-4 bg-radial from-background-light to-background to-70% overflow-hidden">
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

        {/* TITLE */}
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative text-2xl md:text-3xl font-semibold text-center mb-12 md:mb-16"
        >
          Why Anime Fans Love Anivoy
        </motion.h3>

        <div className="grid gap-8 md:gap-12">
          {features.map((feature, index) => {
            const isOdd = index % 2 !== 0;

            const seed = index + 1;

            const rotation = (pseudoRandom(seed) - 0.5) * 2; // -1 → 1
            const rotateDeg = rotation * 1; // max ±2deg

            const marginOffset = (pseudoRandom(seed * 2) - 0.5) * 2; // -1 → 1
            const marginPx = 64 + marginOffset * 12;

            return (
              <motion.div
                initial={{
                  opacity: 0,
                  x: isOdd ? -40 : 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                style={{
                  marginLeft: !isOdd ? `${marginPx}px` : undefined,
                  marginRight: isOdd ? `${marginPx}px` : undefined,
                  rotate: rotateDeg,
                }}
                className="hidden md:block"
              >
                <Card
                  className={`
                    overflow-hidden
                    grid md:grid-cols-9 gap-0
                    ${isOdd ? "" : "md:grid-flow-dense"}
                  `}
                  noPadding
                >
                  <div
                    className={`
                      relative h-auto md:col-span-4 overflow-hidden
                      ${isOdd ? "" : "md:col-start-6"}
                    `}
                  >
                    <img
                      src={feature.src}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className={`
                      p-8 md:p-10 flex flex-col md:col-span-5 justify-center
                      ${isOdd ? "" : "md:col-start-1"}
                    `}
                  >
                    <h4 className="text-xl md:text-2xl font-semibold mb-3">
                      {feature.title}
                    </h4>

                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-2">
                      {feature.description}
                    </p>

                    {feature.actions && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {feature.actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            endIcon={action.icon}
                            className="cursor-pointer"
                            animate
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
