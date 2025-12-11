import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//import { EtablissementRestApi } from "../services/etablissementRestApi";
//import { EtablissementGraphQlApi } from "../services/etablissementGraphQLApi";

export const store = configureStore({
	reducer: {
		// [EtablissementRestApi.reducerPath]: EtablissementRestApi.reducer,
		// [EtablissementGraphQLApi.reducerPath]: EtablissementGraphQLApi.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			// .concat(EtablissementRestApi.middleware)
			// .concat(EtablissementGraphQLApi.middleware),
});

setupListeners(store.dispatch);