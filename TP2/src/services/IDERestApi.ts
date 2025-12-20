import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IDE } from "../types/IDE";

export const IDERestApi = createApi({
	reducerPath: "IDERestApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/"
	}),
	tagTypes: ["IDE"],
	endpoints: (builder) => ({
		getIDEs: builder.query<IDE[], void>({
			query: () => "ide/",
			providesTags: ["IDE"],
		}),
		addIDE: builder.mutation<IDE, Partial<IDE>>({
			query: (newIDE) =>({
				url: "ide/",
				method: "POST",
				body: newIDE,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["IDE"],
		}),
		deleteIDE: builder.mutation<void, number>({
			query: (id) => ({
				url: "ide/",
				method: "DELETE",
				body: {IDE_id: id },
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetIDEsQuery, useAddIDEMutation, useDeleteIDEMutation } = IDERestApi;