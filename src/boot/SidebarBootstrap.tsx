import { useEffect } from "react";
import { useSidebar } from "@/stores/sidebar.store";

export default function SidebarBootstrap() {
  const refreshMobileState = useSidebar((s) => s.refreshMobileState);

  useEffect(() => {
    refreshMobileState();
    window.addEventListener("resize", refreshMobileState);
    return () => window.removeEventListener("resize", refreshMobileState);
  }, [refreshMobileState]);

  return null;
}
