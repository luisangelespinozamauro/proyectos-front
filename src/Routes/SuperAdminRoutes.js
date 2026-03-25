import React from "react";
import { Routes, Route } from "react-router-dom";
import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Projects from "../Moduls/Projects/Projects";
import Documents from "../Moduls/Documents/Documents";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Documents" element={<Documents />} />
      
      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
