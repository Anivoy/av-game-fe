import { Link } from "react-router";

export default function AppFooter() {
  return (
    <footer className="p-8 md:p-16 flex flex-row gap-6 items-center justify-center bg-radial-[at_50%_100%] from-primary-600/30 to-transparent to-60%">
      <Link to="/" className="opacity-90 -mr-6">
        <img src="/images/logo/logo-full-white.svg" width={108} />
      </Link>
      <p className="text-sm text-white/80">All rights reserved.</p>
      <p className="text-sm text-white/80">Copyright @2025</p>
    </footer>
  );
}
