// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import djangoApi from "@/services/djangoApi";

// export const fetchEtablissementsGQL = createAsyncThunk(
//   "data/fetchGQL",
//   async (_, { getState }) => {
//     const state: any = getState();
//     const token = state.auth.token;

//     const gqlQuery = {
//       query: `
//         query {
//           allEtablissements {
//             id
//             nom
//             prescolaire
//             primaire
//             secondaire
//             coordonnee {
//               municipalite
//               code_postal
//             }
//             regroupement {
//               nom_court
//             }
//           }
//         }
//       `,
//     };

//     const response = await djangoApi.post(
//       "http://127.0.0.1:8000/gql/graphql/",
//       gqlQuery,
//       {
//         headers: { Authorization: `JWT ${token}` },
//       }
//     );

//     return response.data.data.allEtablissements;
//   }
// );

// export const deleteEtablissementGQL = createAsyncThunk(
//   "data/deleteGQL",
//   async (id: number, { getState, dispatch }) => {
//     const state: any = getState();
//     const token = state.auth.token;

//     const gqlMutation = {
//       query: `
//         mutation {
//           deleteEtablissement(id: ${id}) {
//             success
//           }
//         }
//       `,
//     };

//     await djangoApi.post("http://127.0.0.1:8000/gql/graphql/", gqlMutation, {
//       headers: { Authorization: `JWT ${token}` },
//     });

//     dispatch(fetchEtablissementsGQL());
//   }
// );
