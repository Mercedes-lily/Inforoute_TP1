import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { EtablissementRestApi } from "../services/EtablissementRestApi";
import { EtablissementGraphQLApi } from "../services/EtablissementGraphQLApi";
import { SFRGraphQLApi } from "../services/SFRGraphQLApi";
import { SFRRestApi } from "../services/SFRRestApi";
import { CoordonneeGraphQLApi } from "../services/CoordonneeGraphQLApi";
import { CoordonneeRestApi } from "../services/CoordonneeRestApi";
import { IMSEGraphQLApi } from "../services/IMSEGraphQLApi";
import { IMSERestApi } from "../services/IMSERestApi";
import { IDEGraphQLApi } from "../services/IDEGraphQLApi";
import { IDERestApi } from "../services/IDERestApi";
import { RegroupementGraphQLApi } from "../services/RegroupementGraphQLApi";
import { RegroupementRestApi } from "../services/RegroupementRestApi";

export const store = configureStore({
	reducer: {
		[EtablissementRestApi.reducerPath]: EtablissementRestApi.reducer,
		[EtablissementGraphQLApi.reducerPath]: EtablissementGraphQLApi.reducer,
		[SFRRestApi.reducerPath]: SFRRestApi.reducer,
		[SFRGraphQLApi.reducerPath]: SFRGraphQLApi.reducer,
		[CoordonneeRestApi.reducerPath]: CoordonneeRestApi.reducer,
		[CoordonneeGraphQLApi.reducerPath]: CoordonneeGraphQLApi.reducer,
		[IMSEGraphQLApi.reducerPath]: IMSEGraphQLApi.reducer,
		[IMSERestApi.reducerPath]: IMSERestApi.reducer,
		[IDEGraphQLApi.reducerPath]: IDEGraphQLApi.reducer,
		[IDERestApi.reducerPath]: IDERestApi.reducer,
		[RegroupementGraphQLApi.reducerPath]: RegroupementGraphQLApi.reducer,
		[RegroupementRestApi.reducerPath]: RegroupementRestApi.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(EtablissementRestApi.middleware)
			.concat(EtablissementGraphQLApi.middleware)
			.concat(SFRRestApi.middleware)
			.concat(SFRGraphQLApi.middleware)
			.concat(CoordonneeRestApi.middleware)
			.concat(CoordonneeGraphQLApi.middleware)
			.concat(IMSERestApi.middleware)
			.concat(IMSEGraphQLApi.middleware)
			.concat(IDERestApi.middleware)
			.concat(IDEGraphQLApi.middleware)
			.concat(RegroupementRestApi.middleware)
			.concat(RegroupementGraphQLApi.middleware),
});

setupListeners(store.dispatch);