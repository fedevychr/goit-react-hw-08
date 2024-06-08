import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./AuthNav.module.css";

const getNavLinkClassName = ({ isActive }) => {
  return clsx(css.navLink, {
    [css.active]: isActive,
  });
};

const AuthNav = () => {
  return (
    <nav className={css.nav}>
      <NavLink className={getNavLinkClassName} to="/register">
        Register
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/login">
        Login
      </NavLink>
    </nav>
  );
};

export default AuthNav;
