import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import djangpApi from "@/services/djangoApi";

export const fetchEtablissements = createAsyncThunk(
	'etablissements/fetchEtablissements',
	async (_, { getState, rejectWithValue }) => {
		try {
			const state: any = getState();
			const token = state.auth.token;

			const response = await djangpApi.get("http://127.0.0.1:8000/api/ecole/", {
				headers: { Authorization: `JWT ${token}` },
			});
			return response.data;
		} catch (err: any) {
			return rejectWithValue(
				err.response?.data?.message || "Erreur de récupération des établissements"
			);
		}
	}
);

const etablissementsSlice = createSlice({
	name: "etablissements",
	initialState: {
		items: [],
		loading: false,
		error: null as string | null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEtablissements.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEtablissements.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchEtablissements.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default etablissementsSlice.reducer;