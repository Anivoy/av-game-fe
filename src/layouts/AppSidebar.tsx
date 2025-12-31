import { Link, useLocation } from "react-router";
import { useSidebar } from "@/stores/sidebar.store";
import { XIcon } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Game Mode", href: "/game-mode" },
  { name: "Community", href: "/community" },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { isMobileOpen, toggleMobileSidebar, isMobile } = useSidebar();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  if (!isMobile) return null;

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 bg-[#2a2d3a] border-l border-gray-700/50 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-end p-4 border-b border-gray-700/50">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
            aria-label="Close menu"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={toggleMobileSidebar}
                  className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-gray-700/50 text-white font-bold"
                      : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
