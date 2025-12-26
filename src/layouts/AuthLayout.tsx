import { Link, Outlet } from "react-router";

const LayoutContent: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute w-full z-50 p-4 md:p-7 top-0 left-0 right-0 flex flex-row items-center justify-center md:justify-start">
        <Link to="/" className="pt-0.5 pl-1">
          <img src="/images/logo/logo-full.svg" alt="Logo" width={108} />
        </Link>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

const AuthLayout: React.FC = () => {
  return <LayoutContent />;
};

export default AuthLayout;
