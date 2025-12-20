import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IDE } from "../types/IDE";

export const IDEGraphQLApi = createApi({
  reducerPath: "IDEGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/gql/graphql/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["IDE"],
  endpoints: (builder) => ({
    getIDE: builder.query<IDE[], void>({
      query: () => ({
        url: "",
        body: JSON.stringify({
          query: `
					query {
					allIDEs {
						id
						sfr_id
            imse_id
            defavorisation
						}
					}
				`,
        }),
        invalidatesTags: ["IDE"],
      }),
    }),
    addIDE: builder.mutation<IDE, Partial<IDE>>({
      query: (newIDE) => ({
        url: "",
        body: JSON.stringify({
          query: `
					mutation CreateIDE($sfr_id: Number!, $imse_id: Number!, $defavorisation: Boolean!) {
					createIDE(sfr_id: $sfr_id, imse_id: $imse_id, defavorisation: $defavorisation)
					{
						IDE {
              id
							sfr_id
							imse_id
							defavorisation
						}
					}
				}
			`,
          variables: {
			sfr_id: newIDE.sfr_id,
			imse_id: newIDE.imse_id,
			defavorisation: newIDE.defavorisation,
          },
        }),
      }),
      invalidatesTags: ["IDE"],
    }),
    deleteIDE: builder.mutation<void, number>({
      query: (id) => ({
        url: "",
        body: JSON.stringify({
          query: `
				mutation DeleteIDE($id: Int!){
				deleteIDE(id: $id){
					success
				}
			}`,
          variables: { id: Number(id) },
        }),
      }),
      invalidatesTags: ["IDE"],
    }),
  }),
});

export const {
  useGetIDEQuery,
  useAddIDEMutation,
  useDeleteIDEMutation,
} = IDEGraphQLApi;