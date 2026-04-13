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
import FileField from "../../Components/Forms/FileField";

export default function EditProjects({ open, handleClose, id }) {
  const { UpdateProjects } = useContext(ProjectsContext);
  const [project, saveProject] = useState(null);
  const auth_user_id = Number(localStorage.getItem("id"));

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
        const data = res.data;

        const documentsMap = {};
        data.documents.forEach((doc) => {
          documentsMap[doc.type] = doc;
        });

        data.documents = documentsMap;

        saveProject(data);

        if (data.yearly_estimations && data.yearly_estimations.length > 0) {
          setYearlyEstimations(
            data.yearly_estimations.map((item) => ({
              year: item.year,
              amount: item.amount,
            })),
          );
        } else {
          setYearlyEstimations([{ year: "", amount: "" }]);
        }

        reset({
          ...data,
          documents: {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "documents") {
        formData.append(key, data[key]);
      }
    });

    if (data.documents) {
      Object.keys(data.documents).forEach((type) => {
        const file = data.documents[type];
        if (file instanceof File) {
          formData.append(`documents[${type}]`, file);
        }
      });
    }

    yearlyEstimations.forEach((item, index) => {
      formData.append(`yearly_estimations[${index}][year]`, item.year);
      formData.append(`yearly_estimations[${index}][amount]`, item.amount);
    });

    data.id = id;
    await UpdateProjects(id, formData);
    handleClose();
  };

  const projectStatus = [
    { id: "Project confirmed", nombre: "Project confirmed" },
    { id: "In process", nombre: "In process" },
    { id: "First approach", nombre: "First approach" },
  ];

  const documentTypes = [
    "QUESTIONNAIRE",
    "NDA",
    "MOU",
    "TCA",
    "CONTRACT",
    "BOM",
    "PRICE",
    "LAYOUT",
  ];

  const dueDiligence = [
    { id: "Si", nombre: "Si" },
    { id: "No", nombre: "No" },
  ];

  const [yearlyEstimations, setYearlyEstimations] = React.useState([
    { year: "", amount: "" },
  ]);

  const addYear = () => {
    setYearlyEstimations([
      ...yearlyEstimations,
      {
        year: new Date().getFullYear() + yearlyEstimations.length,
        amount: "",
      },
    ]);
  };

  const removeYear = (index) => {
    const updated = [...yearlyEstimations];
    updated.splice(index, 1);
    setYearlyEstimations(updated);
  };

  const handleYearChange = (index, field, value) => {
    const updated = [...yearlyEstimations];
    updated[index][field] = value;
    setYearlyEstimations(updated);
  };

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
              {(auth_user_id === 5 ||
                auth_user_id === 6 ||
                auth_user_id === 13) && (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="PRICE AGREEMENT"
                    {...register("price_agreement", {
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    error={!!errors.price_agreement}
                    helperText={errors.price_agreement?.message}
                  />
                </Grid>
              )}
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
              {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
              </Grid> */}
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SelectField
                  name="due_diligence"
                  label="Due Diligence"
                  control={control}
                  errors={errors}
                  options={dueDiligence}
                />
              </Grid>
              <br />
              {documentTypes.map((type) => (
                <Grid key={type} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <FileField
                    name={`documents.${type}`}
                    label={`${type} (Nueva versión)`}
                    control={control}
                    errors={errors}
                    currentFile={project?.documents?.[type]}
                  />
                </Grid>
              ))}
              <br />
              <Grid size={{ xs: 12 }}>
                {yearlyEstimations.map((item, index) => (
                  <Grid container spacing={2} key={index} mb={1}>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        fullWidth
                        label="Año"
                        type="number"
                        value={item.year}
                        onChange={(e) =>
                          handleYearChange(index, "year", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        fullWidth
                        label="Monto"
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleYearChange(index, "amount", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 2 }}>
                      <Button
                        fullWidth
                        color="error"
                        onClick={() => removeYear(index)}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button onClick={addYear} variant="outlined">
                  + Agregar año
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <TextField
                  rows={4}
                  multiline
                  fullWidth
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
