import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Regroupement } from "../types/Regroupement";

export const RegroupementGraphQLApi = createApi({
  reducerPath: "RegroupementGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["Regroupement"],
  endpoints: (builder) => ({
    getRegroupement: builder.query<Regroupement[], void>({
      query: () => ({
        url: "",
        body: JSON.stringify({
          query: `
						query {
						allRegroupements {
							id
							code
							nom
							nom_court
							coordonnee {
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
						}
					`,
        }),
        invalidatesTags: ["Regroupement"],
      }),
    }),
    addRegroupement: builder.mutation<Regroupement, Partial<Regroupement>>({
      query: (newRegroupement) => ({
        url: "",
        body: JSON.stringify({
          query: `
					mutation CreateRegroupement($code: Number!; $nom: String!, $nomCourt: String!, $coordonnee_id: Number!, $superficie: Number!, $perimetre: Number!, langue: String!) {
					createRegroupement(code: $code, nom: $nom, nomCourt: $nomCourt, coordonnee_id: $coordonnee_id, superficie: $superficie, perimetre: $perimetre, langue: $langue)
					{
						Regroupement {
							code
							nom
							nomCourt
							coordonnee_id
							superficie
							perimetre
							langue
						}
					}
				}
			`,
          variables: {
            nom: newRegroupement.nom,
			code: newRegroupement.code,
			nomCourt: newRegroupement.nom_court,
			coordonnee_id: newRegroupement.coordonnee_id,
			superficie: newRegroupement.superficie,
			perimetre: newRegroupement.perimetre,
			langue: newRegroupement.langue,
          },
        }),
      }),
      invalidatesTags: ["Regroupement"],
    }),
    deleteRegroupement: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        body: JSON.stringify({
          query: `
				mutation DeleteRegroupement($id: Int!){
				deleteRegroupement(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        }),
      }),
      invalidatesTags: ["Regroupement"],
    }),
  }),
});

export const {
  useGetRegroupementQuery,
  useAddRegroupementMutation,
  useDeleteRegroupementMutation,
} = RegroupementGraphQLApi;
