import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchEtablissements } from "@/features/etablissementsSlices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle, Trash2, Pencil } from "lucide-react";

const RestPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.etablissements
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState("tous");
  const [RegroupementFilter, setRegroupementFilter] = React.useState("tous");

  useEffect(() => {
    dispatch(fetchEtablissements());
  }, [dispatch]);
  
  const filteredItems = items.filter((ecole: any) => {
  // 1. Filtre par texte (Nom ou Municipalité)
  const matchesSearch = 
    ecole.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ecole.coordonnee?.municipalite.toLowerCase().includes(searchTerm.toLowerCase());

  // 2. Filtre par niveau
  const matchesLevel = 
    levelFilter === "tous" ||
    (levelFilter === "primaire" && ecole.primaire) ||
    (levelFilter === "secondaire" && ecole.secondaire);

  return matchesSearch && matchesLevel;
});
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Liste des Établissements (CKAN)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Erreur: {error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && (
            <>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Rechercher une école..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />

                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Niveau scolaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les niveaux</SelectItem>
                    <SelectItem value="prescolaire">Préscolaire</SelectItem>
                    <SelectItem value="primaire">Primaire</SelectItem>
                    <SelectItem value="secondaire">Secondaire</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={RegroupementFilter}
                  onValueChange={setRegroupementFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Centre de service scolaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous</SelectItem>
                    <SelectItem value="css_de_la_capitale">
                      CSS de la Capitale
                    </SelectItem>
                    <SelectItem value="css_des_decouvreurs">
                      CSS des Découvreurs
                    </SelectItem>
                    <SelectItem value="css_de_la_gaspesie">
                      CSS de la Gaspésie
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">
                        Nom de l'établissement
                      </TableHead>
                      <TableHead className="font-bold">Localisation</TableHead>
                      <TableHead className="font-bold">Niveaux</TableHead>
                      <TableHead className="font-bold text-center">
                        Défavorisé
                      </TableHead>
                      <TableHead className="font-bold">Regroupement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length > 0 ? (
                      items.map((ecole: any) => (
                        <TableRow key={ecole.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            {ecole.nom}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ecole.coordonnee?.adresse},{" "}
                            <span className="font-medium">
                              {ecole.coordonnee?.code_postal}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">
                            {ecole.type}
                          </TableCell>
                          <TableCell className="text-center">
                            {ecole.ide?.defavorisation ? (
                              <span className="text-destructive font-bold">
                                Oui
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Non</span>
                            )}
                          </TableCell>
                          <TableCell className="font-text-sm">
                            {ecole.regroupement.nom_court}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-10">
                          Aucune donnée trouvée.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestPage;
