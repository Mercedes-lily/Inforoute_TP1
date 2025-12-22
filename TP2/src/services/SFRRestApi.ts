import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { SFR } from "../types/SFR";

export const SFRRestApi = createApi({
  reducerPath: "SFRRestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
  }),
  tagTypes: ["SFR"],
  endpoints: (builder) => ({
    getSFRs: builder.query<SFR[], void>({
      query: () => "etablissement/",
      providesTags: ["SFR"],
    }),
    addSFR: builder.mutation<SFR, Partial<SFR>>({
      query: (newSFR) => ({
        url: "etablissement/",
        method: "POST",
        body: newSFR,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["SFR"],
    }),
    deleteSFR: builder.mutation<void, number>({
      query: (id) => ({
        url: "sfr/",
        method: "DELETE",
        body: { sfr_id: id },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSFRsQuery, useAddSFRMutation, useDeleteSFRMutation } =
  SFRRestApi;
