import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IMSE } from "../types/IMSE";

export const IMSEGraphQLApi = createApi({
  reducerPath: "IMSEGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["IMSE"],
  endpoints: (builder) => ({
    getIMSE: builder.query<IMSE[], void>({
      query: () => ({
        url: "",
        body: JSON.stringify({
          query: `
					query {
					allIMSEs {
						id
						indice
						rang
						}
					}
				`,
        }),
        invalidatesTags: ["IMSE"],
      }),
    }),
    addIMSE: builder.mutation<IMSE, Partial<IMSE>>({
      query: (newIMSE) => ({
        url: "",
        body: JSON.stringify({
          query: `
					mutation CreateIMSE($indice: Number!, $rang: Number!) {
					createIMSE(indice: $indice, rang: $rang)
					{
						IMSE {
							indice
							rang
						}
					}
				}
			`,
          variables: {
			indice: newIMSE.indice,
			rang: newIMSE.rang,
          },
        }),
      }),
      invalidatesTags: ["IMSE"],
    }),
    deleteIMSE: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        body: JSON.stringify({
          query: `
				mutation DeleteIMSE($id: Int!){
				deleteIMSE(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        }),
      }),
      invalidatesTags: ["IMSE"],
    }),
  }),
});

export const {
  useGetIMSEQuery,
  useAddIMSEMutation,
  useDeleteIMSEMutation,
} = IMSEGraphQLApi;