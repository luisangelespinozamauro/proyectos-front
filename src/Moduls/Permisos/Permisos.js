import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TablePermisos from "../../Components/Tables/TablePermisos";
import PermisosContext from "../../Context/Permisos/PermisosContext";

const Permisos = () => {
  const { permisos, GetPermisos } = useContext(PermisosContext);
  
  useEffect(() => {
    GetPermisos();
  }, []);

  return (
    <Layout>
      <TablePermisos rows={permisos} />
    </Layout>
  );
};

export default Permisos;
