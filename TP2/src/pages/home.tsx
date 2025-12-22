import * as React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const { token, user } = useSelector((state: RootState) => state.auth);

  return (
    <main className="container mx-auto mt-10 px-4">
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-20">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bienvenue sur l'api de récupération de données CKAN
        </h1>

        <p className="text-xl text-muted-foreground max-w-[600px]">
          {token ? (
            <>
              Bienvenue <span className="font-bold text-primary">{user?.username || "Utilisateur"}</span>. <br /> Accédez à vos outils via le menu ou les boutons
              ci-dessous.
            </>
          ) : (
            'Veuillez vous connecter en utilisant le bouton "Commencer".'
          )}
          ;
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {token ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/profil")}>
                Mon Profil
              </Button>
              <Button variant="default" onClick={() => navigate("/rest-api")}>
                Données REST
              </Button>
              <Button variant="secondary" onClick={() => navigate("/graphql")}>
                Données GraphQL
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/statistiques")}
              >
                Statistiques
              </Button>
            </>
          ) : (
            <Button size="lg" onClick={() => navigate("/connexion")}>
              Commencer
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
