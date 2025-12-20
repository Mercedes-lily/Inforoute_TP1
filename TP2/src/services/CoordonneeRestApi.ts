import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Coordonnee } from "../types/Coordonnee";

export const CoordonneeRestApi = createApi({
	reducerPath: "CoordonneeRestApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/"
	}),
	tagTypes: ["Coordonnee"],
	endpoints: (builder) => ({
		getCoordonnees: builder.query<Coordonnee[], void>({
			query: () => "cordonnee/",
			providesTags: ["Coordonnee"],
		}),
		addCoordonnee: builder.mutation<Coordonnee, Partial<Coordonnee>>({
			query: (newCoordonnee) =>({
				url: "coordonnee/",
				method: "POST",
				body: newCoordonnee,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Coordonnee"],
		}),
		deleteCoordonnee: builder.mutation<void, number>({
			query: (id) => ({
				url: "coordonnee/",
				method: "DELETE",
				body: {coordonnee_id: id },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetCoordonneesQuery, useAddCoordonneeMutation, useDeleteCoordonneeMutation } = CoordonneeRestApi;