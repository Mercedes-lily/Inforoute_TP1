// import * as React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "./app/store";
// import { getUserProfile } from "./features/authSlices";
// import Home  from "./pages/home";
// import Connexion from "./pages/connexion";
// import Profil from "./pages/profil";
// // import RestPage from "./pages/rest";
// // import GraphQLPage from "./pages/graphql";
// import { BrowserRouter, Routes, Route } from "react-router";
// import NavBar from "./components/NavBar";

// export default () => (
//   <>
//     <BrowserRouter>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/connexion" element={<Connexion />} />
//         <Route path="/profil" element={<Profil />} />
//         {/* <Route path="/rest-api" element={<RestPage />} />
//         <Route path="/graphql" element={<GraphQLPage />} /> */}
//       </Routes>
//     </BrowserRouter>
//   </>
// );
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { getUserProfile } from "./features/authSlices";
import Home from "./pages/home";
import Connexion from "./pages/connexion";
import Profil from "./pages/profil";
import RestPage from "./pages/rest";
import GraphQLPage from "./pages/graphql";
import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //Gerer l'actualisation de la page
    if (token && !user) {
      dispatch(getUserProfile(token));
    }
  }, [token, user, dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/rest-api" element={<RestPage />} />
        <Route path="/graphql" element={<GraphQLPage />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
