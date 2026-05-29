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
import MethodGet from "../../Config/Service";
import RolesContext from "../../Context/Roles/RolesContext";

export default function EditRoles({ open, handleClose, id }) {
  const { UpdateRoles } = useContext(RolesContext);

  const [role, setRole] = useState(null);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      estado: "",
    },
  });

  useEffect(() => {
    if (!id) return;

    MethodGet(`/roles/${id}`)
      .then((res) => {
        setRole(res.data);
      })
      .catch(console.log);
  }, [id]);

  useEffect(() => {
    if (role) {
      reset({
        name: role.name || "",
        estado: role.estado || "",
      });
    }
  }, [role, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id,
    };

    UpdateRoles(payload);
    handleClose();
  };

  const handleDialogClose = () => {
    reset();
    handleClose();
  };

  const estado = [
    { id: 1, nombre: "Inactive" },
    { id: 2, nombre: "Active" },
  ];

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit rol</DialogTitle>

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
                fullWidth
                label="Rol"
                InputLabelProps={{ shrink: true }}
                {...register("name", {
                  required: "This field is required",
                  maxLength: {
                    value: 100,
                    message: "Maxium 100 characters",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name="estado"
                control={control}
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
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
