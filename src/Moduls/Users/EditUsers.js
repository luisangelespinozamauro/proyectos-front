import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import UsersContext from "../../Context/Users/UsersContext";
import MethodGet from "../../Config/Service";

export default function EditUsers({ open, handleClose, id }) {
  const { UpdateUsers } = useContext(UsersContext);

  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (!id) return;

    MethodGet(`/users/${id}`)
      .then((res) => setUsuario(res.data))
      .catch(console.log);
  }, [id]);

  useEffect(() => {
    MethodGet(`/roles`)
      .then((res) => setRoles(res.data))
      .catch(console.log);
  }, []);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (usuario && roles.length > 0) {
      reset({
        collaborator_number: usuario.collaborator_number || "",
        name: usuario.name || "",
        last_name: usuario.last_name || "",
        phone: usuario.phone || "",
        email: usuario.email || "",
        role_id: usuario.role_id || "",
      });
    }
  }, [usuario, roles, reset]);

  const onSubmit = (data) => {
    data.id = id;
    UpdateUsers(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Usuario</DialogTitle>

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
          {usuario && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Nombre"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Apellidos"
                  {...register("last_name", {
                    required: "El apellido es obligatorio",
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="number"
                  fullWidth
                  label="Teléfono"
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
                  InputLabelProps={{ shrink: true }}
                  type="email"
                  fullWidth
                  label="Correo"
                  {...register("email", {
                    required: "El correo es obligatorio",
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  name="role_id"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Debes seleccionar un rol" }}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Selecciona un rol"
                      {...field}
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
                  )}
                />
              </Grid>
            </Grid>
          )}
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
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
