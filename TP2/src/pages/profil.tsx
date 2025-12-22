import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { updateUserProfile } from "@/features/authSlices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";

const Profil: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Pour valider la correspondance des mots de passe
  
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);
  
  if (!token) {
    return (
      <div className="p-10 text-center">
        Veuillez vous connecter pour voir votre profil.
      </div>
    );
  }

  // 2. Si le user n'est pas encore chargé (pendant l'appel API)
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
        <span className="ml-2">Chargement du profil utilisateur...</span>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setErrorMsg("");
    if (password && password !== confirmPassword) {
      setErrorMsg(
        "Les mots de passe ne correspondent pas. Veuillez réessayer."
      );
      return;
    }
    const payload = {
      username,
      email: email,
      ...(password ? { password } : {}),
    };
    const result = await dispatch(updateUserProfile(payload));
    if (updateUserProfile.fulfilled.match(result)) {
      setSuccess(true);
      setPassword(""); // On vide les champs pour confidentialité
      setConfirmPassword("");
      setTimeout(() => setSuccess(false), 3000); // Pour cacher le message après un certain temps
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Mon Profil</CardTitle>
          <CardDescription>
            Gérez vos informations personnelles. Votre rôle :{" "}
            <span className="font-semibold text-primary">{user?.role}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">
            {success && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-4 w-4 stroke-green-800" />
                <AlertDescription>
                  Profil mis à jour avec succès !
                </AlertDescription>
              </Alert>
            )}
            {errorMsg && (
              <Alert variant="destructive">
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Adresse Courriel</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Mot de passe (laisser vide pour ne pas modifier)
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer les modifications"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profil;
