import React from "react";
import { Routes, Route } from "react-router-dom";
import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Projects from "../Moduls/Projects/Projects";
import Brands from "../Moduls/Brands/Brands";

const GerenteMarca = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Brands" element={<Brands />} />
      <Route path="/Projects" element={<Projects />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default GerenteMarca;
