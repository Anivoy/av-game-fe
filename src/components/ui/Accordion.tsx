import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Card from "@/components/ui/Card"
import { cn } from "@/utils/cn"
import type { ReactNode } from "react"

interface AccordionProps {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <Card noPadding className="overflow-hidden">
          <DisclosureButton
            className={cn(
              "w-full flex items-center justify-between gap-4",
              "px-4 py-4 md:px-6",
              "text-left",
              "cursor-pointer"
            )}
          >
            <span className="font-semibold text-white">
              {title}
            </span>

            <ChevronDown
              className={cn(
                "h-5 w-5 text-white transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </DisclosureButton>

          <AnimatePresence initial={false}>
            {open && (
              <DisclosurePanel static>
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  {/* CONTENT WRAPPER */}
                  <div
                    className={cn(
                      "px-4 py-4 md:px-6",
                      "text-white/80 text-sm md:text-base",
                      "leading-relaxed",
                      "border-t border-card-border-to/30"
                    )}
                  >
                    {children}
                  </div>
                </motion.div>
              </DisclosurePanel>
            )}
          </AnimatePresence>

        </Card>
      )}
    </Disclosure>
  )
}
