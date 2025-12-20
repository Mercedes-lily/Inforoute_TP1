import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Etablissement } from "../types/Etablissement";

export const EtablissementGraphQLApi = createApi({
  reducerPath: "EtablissementGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["Etablissement"],
  endpoints: (builder) => ({
    getEtablissement: builder.query<Etablissement[], void>({
      query: () => ({
        url: "",
        body: JSON.stringify({
          query: `
						query {
						allEtablissements {
							id
							codeImm
							nom
							prescolaire
							primaire
							secondaire
							professionnel
							adulte
							type
							coordonnee_id
							ide_id
							regroupement_id
							codeOrg
							}
						}
					`,
        }),
        invalidatesTags: ["Etablissement"],
      }),
    }),
    addEtablissement: builder.mutation<Etablissement, Partial<Etablissement>>({
      query: (newEtablissement) => ({
        url: "",
        body: JSON.stringify({
          query: `
					mutation CreateEtablissement($codeImm: Number!, $nom: String!, $prescolaire: Boolean!, primaire: Boolean!, secondaire: Boolean!, professionnel: Boolean!, adulte: Boolean!, type: String!, coordonnee_id: Number!, ide_id: Number!, regroupement_id: Number!, codeOrg: Number!) {
					createEtablissement(codeImm: $codeImm, nom: $nom, prescolaire: $prescolaire, primaire: $primaire, secondaire: $secondaire, professionnel: $professionnel, adulte: $adulte, type: $type, coordonnee_id: $coordonnee_id, ide_id: $ide_id, regroupement_id: $regroupement_id, codeOrg: $codeOrg)
					{
						etablissement {
							codeImm
							nom
							prescolaire
							primaire
							secondaire
							professionnel
							adulte
							type
							coordonnee {
                id
                adresse
                municipalite
                code_postal
                site
                telephone
              }
							ide{
                id
                sfr{
                  id
                  indice
                  rang
                  }
                imse{
                  id
                  indice
                  rang
                  }
                defavorisation
              }
							regroupement{
                id
                code
                nom
                nom_court
                coordonnee{
                  id
                  adresse
                  municipalite
                  code_postal
                  site
                  telephone
                }
                superficie
                perimetre
                langue
              }
							codeOrg
						}
					}
				}
			`,
          variables: {
            nom: newEtablissement.nom,
            codeImm: newEtablissement.codeImm,
            prescolaire: newEtablissement.prescolaire,
            primaire: newEtablissement.primaire,
            secondaire: newEtablissement.secondaire,
            professionnel: newEtablissement.professionnel,
            adulte: newEtablissement.adulte,
            type: newEtablissement.type,
            coordonnee_id: newEtablissement.coordonnee_id,
            ide_id: newEtablissement.ide_id,
            regroupement_id: newEtablissement.regroupement_id,
            codeOrg: newEtablissement.codeOrg
          },
        }),
      }),
      invalidatesTags: ["Etablissement"],
    }),
    deleteEtablissement: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        body: JSON.stringify({
          query: `
				mutation DeleteEtablissement($id: Int!){
				deleteEtablissement(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        }),
      }),
      invalidatesTags: ["Etablissement"],
    }),
  }),
});

export const {
  useGetEtablissementQuery,
  useAddEtablissementMutation,
  useDeleteEtablissementMutation,
} = EtablissementGraphQLApi;
