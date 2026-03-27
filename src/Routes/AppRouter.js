import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import AuthContext from "../Context/Auth/AuthContext";
import LoadingComponent from "../Components/Loading/LoadingComponent";
import AdminRoutes from "./AdminRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import ConsultorRoutes from "./ConsultorRoutes.js";

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando, loginExterno, errorAuth } =
    useContext(AuthContext);

  const location = window.location;
  const params = new URLSearchParams(location.search);
  const collaborator_number = params.get("collaborator_number");
  const [showLoader, setShowLoader] = React.useState(true);

  useEffect(() => {
    if (collaborator_number) {
      loginExterno(collaborator_number);
    } else {
      usuarioAutenticado();
    }
  }, []);

  useEffect(() => {
    if (!cargando) {
      setTimeout(() => setShowLoader(false), 800);
    }
  }, [cargando]);

  if (showLoader) {
    return <LoadingComponent loading={cargando} />;
  }

  if (!autenticado && errorAuth) {
    window.location.href = "https://ldrhsys.ldrhumanresources.com/";
    return null;
  }

  const role_id = localStorage.getItem("role_id");
  let PrivateComponent = null;

  if (role_id === "1" || role_id === "1") PrivateComponent = SuperAdminRoutes;
  if (role_id === "2" || role_id === "2") PrivateComponent = AdminRoutes;
  if (role_id === "3" || role_id === "3") PrivateComponent = ConsultorRoutes;

  return (
    <Router>
      <Routes>
        {autenticado && PrivateComponent && (
          <Route path="/" element={<Navigate to="/Inicio" replace />} />
        )}

        {PrivateComponent && (
          <Route
            path="/*"
            element={
              <PrivateRouter
                component={PrivateComponent}
                isAuthenticated={autenticado}
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
