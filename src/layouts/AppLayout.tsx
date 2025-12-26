import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import SidebarBootstrap from "@/boot/SidebarBootstrap";
import AppFooter from "./AppFooter";

const LayoutContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarBootstrap />
      <AppSidebar />
      <Backdrop />
      <div className="flex flex-col">
        <AppHeader />
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return <LayoutContent />;
};

export default AppLayout;
