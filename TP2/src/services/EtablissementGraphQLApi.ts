import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Etablissement } from "../types/Etablissement";

export const EtablissementGraphQLApi = createApi({
  reducerPath: "EtablissementGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `JWT ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Etablissement"],
  endpoints: (builder) => ({
    getEtablissement: builder.query<any, void>({
      query: () => ({
        url: "",
        body: {
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
							coordonnee {
                id
                adresse
                municipalite
                codePostal
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
                nomCourt
                coordonnee{
                  id
                  adresse
                  municipalite
                  codePostal
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
					`,
        },
      }),
      transformResponse: (response: {
        data: { allEtablissements: Etablissement[] };
      }) => response.data.allEtablissements,
      providesTags: ["Etablissement"],
    }),
    addEtablissement: builder.mutation<Etablissement, Partial<Etablissement>>({
      query: (newEtablissement) => ({
        url: "",
        method: "POST",
        body: {
          query: `
					mutation CreateEtablissement($codeImm: Int!, $nom: String!, $prescolaire: Boolean!, $primaire: Boolean!, $secondaire: Boolean!, $professionnel: Boolean!, $adulte: Boolean!, $type: String!, $coordonnee: Int!, $ide: Int!, $regroupement: Int!, $codeOrg: Int!) {
					createEtablissement(codeImm: $codeImm, nom: $nom, prescolaire: $prescolaire, primaire: $primaire, secondaire: $secondaire, professionnel: $professionnel, adulte: $adulte, type: $type, coordonnee: $coordonnee, ide: $ide, regroupement: $regroupement, codeOrg: $codeOrg)
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
                codePostal
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
                nomCourt
                coordonnee{
                  id
                  adresse
                  municipalite
                  codePostal
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
            coordonnee: newEtablissement.coordonnee_id,
            ide: newEtablissement.ide_id,
            regroupement: newEtablissement.regroupement_id,
            codeOrg: newEtablissement.codeOrg,
          },
        },
      }),
      invalidatesTags: ["Etablissement"],
    }),
    deleteEtablissement: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: `
				mutation DeleteEtablissement($id: Int!){
				deleteEtablissement(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        },
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
