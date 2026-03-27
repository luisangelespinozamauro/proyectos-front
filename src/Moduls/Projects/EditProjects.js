import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import MethodGet from "../../Config/Service";
import ProjectsContext from "../../Context/Projects/ProjectsContext";
import { useState } from "react";
import SelectField from "../../Components/Forms/Select";

export default function EditProjects({ open, handleClose, id }) {
  const { UpdateProjects } = useContext(ProjectsContext);

  const [project, saveProject] = useState(null);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    let url = `/projects/${id}`;
    MethodGet(url)
      .then((res) => {
        saveProject(res.data);
        reset(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reset]);

  const onSubmit = (data, e) => {
    data.id = id;
    UpdateProjects(data);
    handleClose();
  };

  const projectStatus = [
    { id: "Project confirmed", nombre: "Project confirmed" },
    { id: "In process", nombre: "In process" },
    { id: "First approach", nombre: "First approach" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Editar proyecto</DialogTitle>
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
          {project && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="BRAND"
                  defaultValue={project.brand}
                  {...register("brand", {
                    required: "Este campo es obligatorio",
                    minLength: { value: 1, message: "Mínimo 1 caracteres" },
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="MODEL"
                  defaultValue={project.model}
                  {...register("model", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.model}
                  helperText={errors.model?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="PRODUCT FAMILY"
                  defaultValue={project.product_family}
                  {...register("product_family", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.product_family}
                  helperText={errors.product_family?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="ESTIMATED VOLUME"
                  defaultValue={project.estimated_volume}
                  {...register("estimated_volume", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.estimated_volume}
                  helperText={errors.estimated_volume?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="QUESTIONNAIRE COMPLETION"
                  defaultValue={project.questionnaire_completion}
                  {...register("questionnaire_completion", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.questionnaire_completion}
                  helperText={errors.questionnaire_completion?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="NDA STATUS"
                  defaultValue={project.nda_status}
                  {...register("nda_status", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.nda_status}
                  helperText={errors.nda_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="MOU"
                  defaultValue={project.mou_status}
                  {...register("mou_status", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.mou_status}
                  helperText={errors.mou_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="TCA"
                  defaultValue={project.tca_status}
                  {...register("tca_status", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.tca_status}
                  helperText={errors.tca_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="CONTRACT"
                  defaultValue={project.contract_status}
                  {...register("contract_status", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.contract_status}
                  helperText={errors.contract_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="BOM"
                  defaultValue={project.bom_status}
                  {...register("bom_status", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.bom_status}
                  helperText={errors.bom_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="PRICE AGREEMENT"
                  defaultValue={project.price_agreement}
                  {...register("price_agreement", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.price_agreement}
                  helperText={errors.price_agreement?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SelectField
                  name="project_status"
                  label="PROJECT STATUS"
                  control={control}
                  errors={errors}
                  options={projectStatus}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="ASSEMBLY APPROACH"
                  defaultValue={project.assembly_approach}
                  {...register("assembly_approach", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.assembly_approach}
                  helperText={errors.assembly_approach?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="ASSEMBLY LINE"
                  defaultValue={project.assembly_line}
                  {...register("assembly_line", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.assembly_line}
                  helperText={errors.assembly_line?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="LAYOUT"
                  defaultValue={project.layout}
                  {...register("layout", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.layout}
                  helperText={errors.layout?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="PRODUCTION"
                  defaultValue={project.production}
                  {...register("production_2026", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.production_2026}
                  helperText={errors.production_2026?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="POTENTIAL VOLUME"
                  defaultValue={project.potential_volume}
                  {...register("potential_volume", {
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.potential_volume}
                  helperText={errors.potential_volume?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  rows={4}
                  multiline
                  fullWidth
                  label="COMMENTS"
                  defaultValue={project.comments}
                  {...register("comments", {})}
                  error={!!errors.comments}
                  helperText={errors.comments?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  rows={4}
                  multiline
                  fullWidth
                  label="NEXT STEPS"
                  defaultValue={project.next_steps}
                  {...register("next_steps", {})}
                  error={!!errors.next_steps}
                  helperText={errors.next_steps?.message}
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
