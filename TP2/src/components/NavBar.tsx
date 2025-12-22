import * as React from "react";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { logout } from "@/features/authSlices";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-white underline underline-offset-4" : "text-slate-400"
    );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-slate-950 text-slate-50">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <div className="flex gap-6 md:gap-10">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>
          {token && (
            <>
              <NavLink to="/profil" className={linkClass}>Profil</NavLink>
              <NavLink to="/rest-api" className={linkClass}>REST API</NavLink>
              <NavLink to="/graphql" className={linkClass}>GraphQL API</NavLink>
            </>
          )}
        </div>
        <div className="ml-auto flex items-center gap-4">
          {token ? (
            <Button variant="ghost" 
              className="text-slate-400 hover:text-white"
              onClick={handleLogout}>
              Déconnexion
            </Button>
          ) : (
            <NavLink to="/connexion" className={linkClass}>
              Connexion
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
