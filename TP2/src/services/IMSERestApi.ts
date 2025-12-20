import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IMSE } from "../types/IMSE";

export const IMSERestApi = createApi({
	reducerPath: "IMSERestApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/"
	}),
	tagTypes: ["IMSE"],
	endpoints: (builder) => ({
		getIMSEs: builder.query<IMSE[], void>({
			query: () => "imse/",
			providesTags: ["IMSE"],
		}),
		addIMSE: builder.mutation<IMSE, Partial<IMSE>>({
			query: (newIMSE) =>({
				url: "imse/",
				method: "POST",
				body: newIMSE,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["IMSE"],
		}),
		deleteIMSE: builder.mutation<void, number>({
			query: (id) => ({
				url: "imse/",
				method: "DELETE",
				body: {IMSE_id: id },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetIMSEsQuery, useAddIMSEMutation, useDeleteIMSEMutation } = IMSERestApi;