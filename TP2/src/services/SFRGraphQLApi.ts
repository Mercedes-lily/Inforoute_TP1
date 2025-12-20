import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { SFR } from "../types/SFR";

export const SFRGraphQLApi = createApi({
  reducerPath: "SFRGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["SFR"],
  endpoints: (builder) => ({
    getSFRs: builder.query<SFR[], void>({
      query: () => ({
        url: "",
        body: JSON.stringify({
          query: `
					query {
					allSFRs {
						id
						indice
						rang
						}
					}
				`,
        }),
        invalidatesTags: ["SFR"],
      }),
    }),
    addSFR: builder.mutation<SFR, Partial<SFR>>({
      query: (newSFR) => ({
        url: "",
        body: JSON.stringify({
          query: `
					mutation CreateSFR($indice: Number!, $rang: Number!) {
					createSFR(indice: $indice, rang: $rang)
					{
						SFR {
							id
							indice
							rang
						}
					}
				}
			`,
          variables: {
			indice: newSFR.indice,
			rang: newSFR.rang,
          },
        }),
      }),
      invalidatesTags: ["SFR"],
    }),
    deleteSFR: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        body: JSON.stringify({
          query: `
				mutation DeleteSFR($id: Int!){
				deleteSFR(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        }),
      }),
      invalidatesTags: ["SFR"],
    }),
  }),
});

export const {
  useGetSFRsQuery,
  useAddSFRMutation,
  useDeleteSFRMutation,
} = SFRGraphQLApi;