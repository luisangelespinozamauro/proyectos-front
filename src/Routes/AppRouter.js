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

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando, loginExterno, errorAuth } =
    useContext(AuthContext);

  const location = window.location;
  const params = new URLSearchParams(location.search);
  const numcolaborador = params.get("numcolaborador");
  const [showLoader, setShowLoader] = React.useState(true);

  useEffect(() => {
    if (numcolaborador) {
      loginExterno(numcolaborador);
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

  const rolid = localStorage.getItem("rolid");
  let PrivateComponent = null;

  if (rolid === "1" || rolid === "1") PrivateComponent = SuperAdminRoutes;
  if (rolid === "2" || rolid === "2") PrivateComponent = AdminRoutes;

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
