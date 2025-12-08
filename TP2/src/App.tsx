import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home  from "./pages/home";
import Connexion from "./pages/connexion";
import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";

export default () => (
  <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
  </>
);
