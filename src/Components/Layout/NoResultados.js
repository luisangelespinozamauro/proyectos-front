import React from "react";
import Layout from "./Layout";
import { Grid, Typography } from "@mui/material";

const NoResultados = () => {
  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          404
        </Typography>

        <Typography variant="h6">
          La página que buscas no está disponible.
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Verifica la dirección web o regresa a la página principal.
        </Typography>
      </Grid>
    </Layout>
  );
};

export default NoResultados;
