import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import UsersContext from "../../Context/Users/UsersContext";
import { useEffect, useContext, useState } from "react";
import MethodGet from "../../Config/Service";

export default function AddUsers({ open, handleClose }) {
  const { CreateUsers } = useContext(UsersContext);

  const [roles, saveRoles] = useState([]);
  useEffect(() => {
    let url = `/roles`;
    MethodGet(url)
      .then((res) => {
        saveRoles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    CreateUsers(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo Usuario</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                type="number"
                fullWidth
                label="Num. Colaborador"
                {...register("collaborator_number", {
                  required: "El Num. Colaborador es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                })}
                error={!!errors.collaborator_number}
                helperText={errors.collaborator_number?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre"
                {...register("name", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Apellidos"
                {...register("last_name", {
                  required: "El apellido es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="number"
                fullWidth
                label="Telefono"
                {...register("phone", {
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="email"
                fullWidth
                label="Correo"
                {...register("email", {
                  required: "El correo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Selecciona un rol"
                {...register("role_id", {
                  required: "Debes seleccionar un rol",
                })}
                error={!!errors.role_id}
                helperText={errors.role_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un rol --</em>
                </MenuItem>
                {roles.map((rol) => (
                  <MenuItem key={rol.id} value={rol.id}>
                    {rol.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
