import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Regroupement } from "../types/Regroupement";

export const RegroupementRestApi = createApi({
	reducerPath: "RegroupementRestApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/"
	}),
	tagTypes: ["Regroupement"],
	endpoints: (builder) => ({
		getRegroupements: builder.query<Regroupement[], void>({
			query: () => "regroupement/",
			providesTags: ["Regroupement"],
		}),
		addRegroupement: builder.mutation<Regroupement, Partial<Regroupement>>({
			query: (newRegroupement) =>({
				url: "regroupement/",
				method: "POST",
				body: newRegroupement,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Regroupement"],
		}),
		deleteRegroupement: builder.mutation<void, number>({
			query: (id) => ({
				url: "regroupement/",
				method: "DELETE",
				body: {regroupement_id: id },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetRegroupementsQuery, useAddRegroupementMutation, useDeleteRegroupementMutation } = RegroupementRestApi;