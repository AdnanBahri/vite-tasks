import { NavLink } from "react-router-dom";
import ToggleTheme from "../toggle-theme";
import AvatarMenu from "../avatar-menu";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-background shadow">
      <nav className="w-full max-w-7xl mx-auto px-6 lg:px-8 2xl:px-0 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <div className="text-2xl font-semibold leading-none tracking-tight">
            Todo<span className="text-blue-600 dark:text-blue-500">ist</span>
          </div>
        </NavLink>
        {/* Icons */}
        <ul className="flex items-center gap-x-4">
          {isAuthenticated && (
            <li className="btn-icon flex items-center justify-center">
              <AvatarMenu />
            </li>
          )}
          <li className="btn-icon flex items-center justify-center">
            <ToggleTheme />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
