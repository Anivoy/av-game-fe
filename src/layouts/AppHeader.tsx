import { Link, useLocation } from "react-router";
import Button from "@/components/ui/Button";
import { HamburgerIcon } from "lucide-react";
import { useSidebar } from "@/stores/sidebar.store";
import Card from "@/components/ui/Card";
import { useAuthStore } from "@/stores/auth.store";
import UserDropdown from "@/components/common/UserDropdown";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Game Mode", href: "/game-mode" },
  { name: "Community", href: "/community" },
];

const AppHeader: React.FC = () => {
  const location = useLocation();
  const { toggleMobileSidebar, isMobile } = useSidebar();
  const { isAuthenticated } = useAuthStore();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-999 pointer-events-none">
      <div
        className="
          pointer-events-none
          absolute inset-0
          backdrop-blur-xs
          -z-10
          mask-[linear-gradient(to_top,transparent_0%,black_80%)]
        "
      />
      <div className="m-3 mb-0 pointer-events-auto">
        <Card>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex gap-8 items-center">
              <Link to="/" className="pt-0.5 pl-1">
                <img src="/images/logo/logo-full.svg" alt="Logo" width={108} />
              </Link>

              {/* Desktop Navigation */}
              {!isMobile && (
                <nav className="hidden md:flex items-center gap-8 pt-0.5">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`transition-colors italic relative pb-1 ${
                        isActive(item.href)
                          ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            {/* Desktop Actions */}
            {!isMobile && !isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Button as={Link} to="/signin" size="md" color="secondary">
                  Sign In
                </Button>
                <Button as={Link} to="/signup" size="md" color="primary">
                  Get Started
                </Button>
              </div>
            ) : (
              <UserDropdown />
            )}

            {/* Mobile Actions */}
            {isMobile && (
              <div className="flex md:hidden items-center gap-3">
                <Button as={Link} to="/signin" size="md" color="secondary">
                  Sign In
                </Button>

                <button
                  onClick={toggleMobileSidebar}
                  className="p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
                  aria-label="Toggle menu"
                >
                  <HamburgerIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </header>
  );
};

export default AppHeader;
