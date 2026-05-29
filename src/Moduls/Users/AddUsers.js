import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
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
import { useEffect, useContext, useState } from "react";
import MethodGet from "../../Config/Service";

export default function AddUsers({ open, handleClose, brands }) {
  const { CreateUsers } = useContext(UsersContext);
  const [roles, saveRoles] = useState([]);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      brands: [],
    },
  });

  const roleSelected = watch("role_id");

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

  useEffect(() => {
    register("brands", {
      validate: (value) => {
        if (Number(roleSelected) === 4) {
          return value?.length > 0 || "You must select at least one brand";
        }

        return true;
      },
    });
  }, [register, roleSelected]);

  useEffect(() => {
    if (Number(roleSelected) !== 4) {
      setValue("brands", []);
    }
  }, [roleSelected, setValue]);

  const onSubmit = (data) => {
    CreateUsers(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New user</DialogTitle>
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
                fullWidth
                label="last name"
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
                type="number"
                fullWidth
                label="Phone"
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
                label="Email"
                {...register("email", {
                  required: "This field is required",
                  maxLength: {
                    value: 100,
                    message: "Maximum 100 characters",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Select an role"
                {...register("role_id", {
                  required: "This field is required",
                })}
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
            </Grid>
            {Number(roleSelected) === 4 && (
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.brands}>
                  <InputLabel>Select an brand</InputLabel>

                  <Select
                    multiple
                    value={watch("brands") || []}
                    onChange={(e) => {
                      setValue("brands", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    input={<OutlinedInput label="Select an brand" />}
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
                          checked={(watch("brands") || []).includes(brand.id)}
                        />

                        <ListItemText primary={brand.name} />
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>{errors.brands?.message}</FormHelperText>
                </FormControl>
              </Grid>
            )}
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
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
