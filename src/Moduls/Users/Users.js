import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableUsers from "../../Components/Tables/TableUsers";
import UsersContext from "../../Context/Users/UsersContext";

const Users = () => {
  const { users, GetUsers } = useContext(UsersContext);

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <Layout>
      <TableUsers rows={users} />
    </Layout>
  );
};

export default Users;
