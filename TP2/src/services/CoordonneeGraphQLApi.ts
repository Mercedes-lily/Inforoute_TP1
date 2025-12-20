import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Coordonnee } from "../types/Coordonnee";

export const CoordonneeGraphQLApi = createApi({
  reducerPath: "CoordonneeGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["Coordonnee"],
  endpoints: (builder) => ({
    getCoordonnee: builder.query<Coordonnee[], void>({
      query: () => ({
        url: "",
        body: JSON.stringify({
          query: `
						query {
						allCoordonnees {
							id
							adresse
							municipalite
							code_postal
							site
							telephone
						}
				`,
		}),
        invalidatesTags: ["Coordonnee"],
      }),
    }),
    addCoordonnee: builder.mutation<Coordonnee, Partial<Coordonnee>>({
      query: (newCoordonnee) => ({
        url: "",
        body: JSON.stringify({
          query: `
					mutation CreateCoordonnee($adresse: String!, $municipalite: String!, $code_postal: String!, $site: String!, $telephone: String!) {
					createCoordonnee(adresse: $adresse, municipalite: $municipalite, code_postal: $code_postal, site: $site, telephone: $telephone)
					{
						coordonnee {
							id
							adresse
							municipalite
							code_postal
							site
							telephone
						}
					}
				}
			`,
          variables: {
            adresse: newCoordonnee.adresse,
            municipalite: newCoordonnee.municipalite,
            code_postal: newCoordonnee.code_postal,
            site: newCoordonnee.site,
            telephone: newCoordonnee.telephone,
          },
        }),
      }),
      invalidatesTags: ["Coordonnee"],
    }),
    deleteCoordonnee: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        body: JSON.stringify({
          query: `
				mutation DeleteCoordonnee($id: Int!){
				deleteCoordonnee(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        }),
      }),
      invalidatesTags: ["Coordonnee"],
    }),
  }),
});

export const {
  useGetCoordonneeQuery,
  useAddCoordonneeMutation,
  useDeleteCoordonneeMutation,
} = CoordonneeGraphQLApi;
