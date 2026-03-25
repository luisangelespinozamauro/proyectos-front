import React, { useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import AuthContext from "../../Context/Auth/AuthContext";
import LogoDinamico from "./LogoDinamico";
import { tienePermisoMenu } from "../../utils/roles";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import ApartmentIcon from "@mui/icons-material/Apartment";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

const MODULOS = [
  {
    id: 1,
    segment: "Inicio",
    title: "Inicio",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    segment: "Proyectos",
    title: "Proyectos",
    icon: <FolderIcon />,
  },
  {
    id: 3,
    segment: "Documentos",
    title: "Documentos",
    icon: <DescriptionIcon />,
  },
  {
    id: 4,
    segment: "Departamentos",
    title: "Departamentos",
    icon: <ApartmentIcon />,
  },
];

const construirMenu = (role_id) => {
  return MODULOS.map((modulo) => {
    if (!tienePermisoMenu(role_id, modulo.id)) return null;
    if (!modulo.children) return modulo;

    const childrenFiltrados = modulo.children.filter((child) =>
      tienePermisoMenu(role_id, child.id),
    );

    if (childrenFiltrados.length === 0) return null;

    return {
      ...modulo,
      children: childrenFiltrados,
    };
  }).filter(Boolean);
};

export default function Header({ children }) {
  const { cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const router = useMemo(
    () => ({
      pathname: location.pathname,
      navigate: (path) => {
        if (path === "/volver-intranet") {
          window.location.href =
            "https://ldrhsys.ldrhumanresources.com/Cliente/interfaces/Inicio.php";
          return;
        }

        if (path === "/cerrar-sesion") {
          cerrarSesion();
          return;
        }

        navigate(path);
      },
    }),
    [location.pathname, navigate, cerrarSesion],
  );

  const role_id = Number(localStorage.getItem("role_id"));

  const menuItems = useMemo(() => {
    const baseMenu = construirMenu(role_id);

    return [
      ...baseMenu,
      { kind: "divider" },

      {
        segment: "volver-intranet",
        title: "Volver a la intranet",
        icon: <KeyboardReturnIcon />,
      },
      {
        segment: "cerrar-sesion",
        title: "Cerrar sesión",
        icon: <LogoutIcon />,
      },
    ];
  }, [role_id]);

  return (
    <AppProvider
      navigation={menuItems}
      router={router}
      theme={theme}
      branding={{
        logo: <LogoDinamico />,
        title: "",
      }}
    >
      <DashboardLayout defaultSidebarCollapsed initialExpandedItems={[]}>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
