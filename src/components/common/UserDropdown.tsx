import { useAuthStore } from "@/stores/auth.store";
import { useSignOut } from "@/hooks/useAuthApi";
import { ChevronDown, LogOut, User } from "lucide-react";
import { cn } from "@/utils/cn";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  useClose,
} from "@headlessui/react";
import { Link } from "react-router";
import Card from "../ui/Card";
import { AnimatePresence, motion } from "framer-motion";

function MenuItem({
  icon: Icon,
  className,
  children,
  onClick,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  const close = useClose();

  const commonClass = cn(
    "flex items-center gap-3 rounded-lg p-3 w-full transition hover:bg-white/5 text-white cursor-pointer",
    className
  );

  if (to) {
    return (
      <Link to={to} onClick={close} className={commonClass}>
        <Icon className="w-5 h-5" />
        <p className="italic text-sm">{children}</p>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        close();
      }}
      className={commonClass}
    >
      <Icon className="w-5 h-5" />
      <p className="italic text-sm">{children}</p>
    </button>
  );
}

export default function UserDropdown() {
  const { user } = useAuthStore();
  const signOutMutation = useSignOut();

  const displayName = user?.displayName || "Anivoy User";

  return (
    <Popover as="div" className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="flex items-center cursor-pointer">
            <span className="mr-3 h-9 w-9 overflow-hidden rounded-full">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName
                )}&background=f35540&color=991b1b`}
                alt={`${displayName} avatar`}
              />
            </span>

            <span className="mr-2 font-semibold">{displayName}</span>

            <ChevronDown
              className={cn(
                "h-5 w-5 text-white transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </PopoverButton>

          <AnimatePresence>
            {open && (
              <PopoverPanel
                static
                anchor="bottom"
                className="absolute right-0 mt-[17px] w-[260px] p-3 z-50"
              >
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <Card noPadding className="overflow-hidden">
                    <div className="p-4">
                      <span className="block font-semibold text-white">
                        {displayName}
                      </span>
                      <span className="mt-0.5 block text-sm text-white/80">
                        {user?.email || "-"}
                      </span>
                    </div>

                    <div className="h-px bg-card-border-to/30" />

                    <div className="p-2">
                      <MenuItem icon={User} to="/profile">
                        Profile
                      </MenuItem>

                      <MenuItem
                        icon={LogOut}
                        onClick={() => signOutMutation.mutate()}
                      >
                        Sign Out
                      </MenuItem>
                    </div>
                  </Card>
                </motion.div>
              </PopoverPanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
