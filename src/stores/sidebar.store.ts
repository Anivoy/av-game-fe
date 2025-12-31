import { create } from "zustand";

type SidebarState = {
  isMobileOpen: boolean;
  isMobile: boolean;

  toggleMobileSidebar: () => void;
  refreshMobileState: () => void;
};

export const useSidebar = create<SidebarState>((set, get) => ({
  isMobileOpen: false,
  isMobile: false,

  refreshMobileState: () => {
    if (typeof window === "undefined") return;
    const mobile = window.innerWidth < 768;

    set({
      isMobile: mobile,
      isMobileOpen: mobile ? get().isMobileOpen : false,
    });
  },

  toggleMobileSidebar: () => {
    set((s) => ({ isMobileOpen: !s.isMobileOpen }));
  },
}));
