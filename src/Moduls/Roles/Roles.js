import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableRoles from "../../Components/Tables/TableRoles";
import RolesContext from "../../Context/Roles/RolesContext";

const Roles = () => {
  const { roles, GetRoles } = useContext(RolesContext);
  
  useEffect(() => {
    GetRoles();
  }, []);

  return (
    <Layout>
      <TableRoles rows={roles} />
    </Layout>
  );
};

export default Roles;
