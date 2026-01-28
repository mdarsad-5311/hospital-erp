import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";

const NavLink = forwardRef(
  (
    {
      to,
      className = "",
      activeClassName = "",
      pendingClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        {...props}
        className={({ isActive, isPending }) =>
          `
            ${className}
            ${isActive ? activeClassName : ""}
            ${isPending ? pendingClassName : ""}
          `
        }
      />
    );
  }
);

NavLink.displayName = "NavLink";

export default NavLink;
