import * as React from "react";
import { Button } from "@/components/ui/button"; // Composant shadcn
import { useNavigate } from "react-router"; // Pour la navigation

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    // "container" est configuré via shadcn dans tailwind.config.js
    <main className="container mx-auto mt-10 px-4">
      {/* Remplacement de Row/Col par un layout Flex ou Grid Tailwind */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-20">
        
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the Home Page
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-[600px]">
          This is the main landing page of our application. 
          Built with React, TypeScript, and ShadCN UI.
        </p>

        <div className="flex gap-4">
          <Button onClick={() => navigate("/connexion")}>
            Commencer
          </Button>
          <Button variant="outline" onClick={() => navigate("/statistiques")}>
            Voir les stats
          </Button>
        </div>
        
      </div>
    </main>
  );
};

export default Home;