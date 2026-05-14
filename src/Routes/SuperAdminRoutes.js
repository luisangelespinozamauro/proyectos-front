import React from "react";
import { Routes, Route } from "react-router-dom";
import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Projects from "../Moduls/Projects/Projects";
import Users from "../Moduls/Users/Users";
import Brands from "../Moduls/Brands/Brands";
import Roles from "../Moduls/Roles/Roles";
import Permisos from "../Moduls/Permisos/Permisos";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Brands" element={<Brands />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Roles" element={<Roles />} />
      <Route path="/Permisos" element={<Permisos />} />

      
      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
