import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/store";
import type { Etablissement } from "../types/Etablissement";

export const EtablissementRestApi = createApi({
	reducerPath: "EtablissementRestApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/",
		prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `JWT ${token.trim()}`);
      }
      return headers;
    },
	}),
	tagTypes: ["Etablissement"],
	endpoints: (builder) => ({
		getEtablissements: builder.query<Etablissement[], void>({
			query: () => "etablissement/",
			providesTags: ["Etablissement"],
		}),
		addEtablissement: builder.mutation<Etablissement, Partial<Etablissement>>({
			query: (newEtablissement) =>({
				url: "etablissement/",
				method: "POST",
				body: newEtablissement,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Etablissement"],
		}),
		deleteEtablissement: builder.mutation<void, number>({
			query: (id) => ({
				url: "etablissement/${id}/",
				method: "DELETE",
				body: {etablissement_id: id },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetEtablissementsQuery, useAddEtablissementMutation, useDeleteEtablissementMutation } = EtablissementRestApi;