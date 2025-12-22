import * as React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchEtablissements } from "@/features/etablissementsSlices";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
import { Loader2, AlertCircle } from "lucide-react";
import { useGetEtablissementQuery } from "@/services/EtablissementGraphQLApi";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];
const RestPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: items = [], isLoading, error } = useGetEtablissementQuery();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState("tous");
  const [RegroupementFilter, setRegroupementFilter] = React.useState("tous");
  const [defavoriseeFilter, setDefavoriseeFilter] = React.useState("tous");
  //Faire les statistiques pour le graphique
  const chartData = useMemo(() => {
    const stats: Record<string, number> = {};

    items.forEach((ecole: any) => {
      const name =
        ecole.regroupement?.nom_court ||
        ecole.regroupement?.nomCourt ||
        "Inconnu";
      stats[name] = (stats[name] || 0) + 1;
    });

    return Object.entries(stats).map(([name, count]) => ({
      name,
      count,
    }));
  }, [items]);

  useEffect(() => {
    dispatch(fetchEtablissements());
  }, [dispatch]);

  const filteredItems = items.filter((ecole: any) => {
    const matchesSearch =
      ecole.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ecole.coordonnee?.adresse
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesLevel =
      levelFilter === "tous" ||
      (levelFilter === "prescolaire" && ecole.prescolaire) ||
      (levelFilter === "primaire" && ecole.primaire) ||
      (levelFilter === "secondaire" && ecole.secondaire);

    const matchesDefavorisee =
      defavoriseeFilter === "tous" ||
      (defavoriseeFilter === "oui" && ecole.ide?.defavorisation) ||
      (defavoriseeFilter === "non" && !ecole.ide?.defavorisation);

    const matchesRegroupement =
      RegroupementFilter === "tous" ||
      (RegroupementFilter === "css_de_la_capitale" &&
        ecole.regroupement.code === 732000) ||
      (RegroupementFilter === "css_des_decouvreurs" &&
        ecole.regroupement.code === 733000) ||
      (RegroupementFilter === "css_premieres_seigneuries" &&
        ecole.regroupement.code === 734000);

    return (
      matchesSearch && matchesLevel && matchesRegroupement && matchesDefavorisee
    );
  });
  //Roue de chargement si les données sont en cours de chargement...
  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-10 w-10" /></div>;
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="bg-slate-50/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Répartition par Regroupement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Liste des Établissements (REST)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Erreur: {error.toString()}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && (
            <>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Rechercher une école ou une adresse..."
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
                  value={defavoriseeFilter}
                  onValueChange={setDefavoriseeFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Défavorisé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous</SelectItem>
                    <SelectItem value="oui">Défavorisé</SelectItem>
                    <SelectItem value="non">Non défavorisé</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={RegroupementFilter}
                  onValueChange={setRegroupementFilter}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Centre de service scolaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les regroupements</SelectItem>
                    <SelectItem value="css_de_la_capitale">
                      CSS de la Capitale
                    </SelectItem>
                    <SelectItem value="css_des_decouvreurs">
                      CSS des Découvreurs
                    </SelectItem>
                    <SelectItem value="css_premieres_seigneuries">
                      CSS des Premières Seigneuries
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
                    {filteredItems.length > 0 ? (
                      filteredItems.map((ecole: any) => (
                        <TableRow key={ecole.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            {ecole.nom}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ecole.coordonnee?.adresse},{" "}
                            <span className="font-medium">
                              {ecole.coordonnee?.codePostal}
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
                            {ecole.regroupement.nomCourt}
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
