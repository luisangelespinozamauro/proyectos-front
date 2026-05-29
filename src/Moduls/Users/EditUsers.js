import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import UsersContext from "../../Context/Users/UsersContext";
import MethodGet from "../../Config/Service";

export default function EditUsers({ open, handleClose, id, brands }) {
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
    watch,
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
        brands: usuario.brands?.map((brand) => brand.id) || [],
        estado: usuario.estado || "",
      });
    }
  }, [usuario, roles, reset]);

  const onSubmit = (data) => {
    data.id = id;
    UpdateUsers(data);
    handleClose();
  };

  const roleSelected = watch("role_id");

  const estado = [
    { id: 1, nombre: "Inactive" },
    { id: 2, nombre: "Active" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit user</DialogTitle>

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
                  label="Collaborator number"
                  {...register("collaborator_number", {
                    required: "This field is required",
                    minLength: { value: 3, message: "Minium 3 characters" },
                    maxLength: { value: 10, message: "Maximum 10 characters" },
                  })}
                  error={!!errors.collaborator_number}
                  helperText={errors.collaborator_number?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Name"
                  {...register("name", {
                    required: "This field is required",
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Last name"
                  {...register("last_name", {
                    required: "This field is required",
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
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
                  label="Phone"
                  {...register("phone", {
                    minLength: { value: 10, message: "Minium 10 characters" },
                    maxLength: { value: 10, message: "Maximum 10 characters" },
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
                  label="Email"
                  {...register("email", {
                    required: "This field is required",
                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
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
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Select an role"
                      {...field}
                      error={!!errors.role_id}
                      helperText={errors.role_id?.message}
                    >
                      <MenuItem value="">
                        <em>-- Select an option --</em>
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
              {Number(roleSelected) === 4 && (
                <Grid size={12}>
                  <Controller
                    name="brands"
                    control={control}
                    defaultValue={[]}
                    rules={{
                      required: "You must select at least one brand",
                    }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.brands}>
                        <InputLabel>Select an brands</InputLabel>

                        <Select
                          multiple
                          {...field}
                          input={<OutlinedInput label="Selecciona marcas" />}
                          renderValue={(selected) =>
                            brands
                              .filter((brand) => selected.includes(brand.id))
                              .map((brand) => brand.name)
                              .join(", ")
                          }
                        >
                          {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.id}>
                              <Checkbox
                                checked={field.value?.includes(brand.id)}
                              />

                              <ListItemText primary={brand.name} />
                            </MenuItem>
                          ))}
                        </Select>

                        <FormHelperText>
                          {errors.brands?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
              )}

              <Grid size={12}>
                <Controller
                  name="estado"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      {...field}
                      error={!!errors.estado}
                      helperText={errors.estado?.message}
                    >
                      <MenuItem value="">
                        <em>-- Select an option --</em>
                      </MenuItem>

                      {estado.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.nombre}
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
            Cancel
          </Button>

          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
