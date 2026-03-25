import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DescriptionIcon from "@mui/icons-material/Description";
import AuthContext from "../../Context/Auth/AuthContext";

const opciones = [
  {
    title: "Inicio",
    descripcion: "Pantalla principal del sistema",
    icon: <HomeIcon />,
    ruta: "/inicio",
    color: "linear-gradient(135deg, #4F46E5, #6366F1)",
  },
  {
    title: "Proyectos",
    descripcion: "Gestión de proyectos",
    icon: <StorefrontIcon />,
    ruta: "/projects",
    color: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
  },
  // {
  //   title: "Documentos",
  //   descripcion: "Administración de documentos",
  //   icon: <DescriptionIcon />,
  //   ruta: "/documents",
  //   color: "linear-gradient(135deg, #9333EA, #A855F7)",
  // },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Inicio = () => {
  const { usuario } = useContext(AuthContext);
  const [saludo, setSaludo] = useState("");

  const getNombreCompleto = (usuario) =>
    [usuario?.user?.name, usuario?.user?.last_name].filter(Boolean).join(" ");

  const getSaludo = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  useEffect(() => {
    setSaludo(getSaludo());
  }, []);

  const nombreCompleto = getNombreCompleto(usuario);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="700">
              Hola, {saludo}, {nombreCompleto}.
              <br />
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Te damos la bienvenida a la Plataforma de Gestión de Proyectos de
              Operaciones, donde podrás administrar y dar seguimiento a tus
              proyectos de manera eficiente.
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {opciones.map((item, index) => (
              <Grid
                item
                key={index}
                component={motion.div}
                variants={cardVariants}
              >
                <Link to={item.ruta} style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      width: 260,
                      height: 260,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 6,
                        width: "100%",
                        background: item.color,
                      }}
                    />

                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "18px",
                          background: item.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography variant="h6" fontWeight="600">
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.descripcion}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Inicio;
