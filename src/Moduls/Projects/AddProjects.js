import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import ProjectsContext from "../../Context/Projects/ProjectsContext";
import SelectField from "../../Components/Forms/Select";
import { useState } from "react";

export default function AddProjects({ open, handleClose }) {
  const { CreateProjects } = useContext(ProjectsContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await CreateProjects(data);
    reset();
    handleClose();
    setSelectedFile(null);
  };

  const projectStatus = [
    { id: "Project confirmed", nombre: "Project confirmed" },
    { id: "In process", nombre: "In process" },
    { id: "First approach", nombre: "First approach" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Nuevo proyecto</DialogTitle>
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
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="BRAND"
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
                {...register("product_family", {
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.product_family}
                helperText={errors.product_family?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="number"
                fullWidth
                label="ESTIMATED VOLUME"
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
                {...register("nda_status", {
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.nda_status}
                helperText={errors.nda_status?.message}
              />
            </Grid>
            {/* <Grid size={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Archivo PDF
              </Typography>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "6px",
                  width: "100%",
                }}
              />
              {selectedFile && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Archivo seleccionado: {selectedFile.name}
                </Typography>
              )}
            </Grid> */}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="MOU"
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
                {...register("layout", {
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.layout}
                helperText={errors.layout?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="number"
                fullWidth
                label="PRODUCTION"
                {...register("production_2026", {
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.production_2026}
                helperText={errors.production_2026?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="number"
                fullWidth
                label="POTENTIAL VOLUME"
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
                fullWidth
                multiline
                label="COMMENTS"
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
                {...register("next_steps", {})}
                error={!!errors.next_steps}
                helperText={errors.next_steps?.message}
              />
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
