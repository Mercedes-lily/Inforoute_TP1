import * as React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

const NavBar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-slate-950 text-slate-50">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <div className="flex gap-6 md:gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-white" : "text-slate-400"
              )
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/connexion"
            className={({ isActive }) =>
              cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-white" : "text-slate-400"
              )
            }
          >
            Connexion
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
