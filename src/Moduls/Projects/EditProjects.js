import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import MethodGet from "../../Config/Service";
import ProjectsContext from "../../Context/Projects/ProjectsContext";
import { useState } from "react";
import SelectField from "../../Components/Forms/Select";
import FileField from "../../Components/Forms/FileField";

export default function EditProjects({ open, handleClose, id, brands }) {
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

        if (data.months_comments && data.months_comments.length > 0) {
          setMonthlyComments(
            data.months_comments.map((item) => ({
              months: item.months,
              comment: item.comment,
            })),
          );
        } else {
          setMonthlyComments([{ months: "", comment: "" }]);
        }

        const cleanData = Object.keys(data).reduce((acc, key) => {
          acc[key] = data[key] === null ? "" : data[key];
          return acc;
        }, {});

        reset({
          ...cleanData,
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

    monthlyComments.forEach((item, index) => {        
      formData.append(`months_comments[${index}][months]`, item.months);
      formData.append(`months_comments[${index}][comment]`, item.comment);
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
    "Questionnaire",
    "Nda",
    "Mou",
    "Tca",
    "Contract",
    "Bom",
    "Price",
    "Layout",
  ];

  const dueDiligence = [
    { id: "Si", nombre: "Si" },
    { id: "No", nombre: "No" },
  ];

  const [yearlyEstimations, setYearlyEstimations] = React.useState([
    { year: "", amount: "" },
  ]);

  const [monthlyComments, setMonthlyComments] = React.useState([
    { months: "", comment: "" },
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

  const addMonth = () => {
    setMonthlyComments([...monthlyComments, { months: "", comment: "" }]);
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

  const removeMonth = (index) => {
    const updated = [...monthlyComments];
    updated.splice(index, 1);
    setMonthlyComments(updated);
  };

  const handleMonthChange = (index, field, value) => {
    const updated = [...monthlyComments];
    updated[index][field] = value;
    setMonthlyComments(updated);
  };

  const estado = [
    { id: 1, nombre: "Inactivo" },
    { id: 2, nombre: "Activo" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Edit project</DialogTitle>
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
                <SelectField
                  name="brand_id"
                  label="Brand"
                  control={control}
                  errors={errors}
                  rules={{
                    required: "This field is required",
                  }}
                  options={brands.map((brand) => ({
                    id: brand.id,
                    nombre: brand.name,
                  }))}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Model"
                  {...register("model", {
                    required: "This field is required",
                    minLength: { value: 1, message: "Minimum 1 character" },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.model}
                  helperText={errors.model?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Product family"
                  {...register("product_family", {
                    required: "This field is required",
                    minLength: { value: 1, message: "Minimum 1 character" },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.product_family}
                  helperText={errors.product_family?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  type="number"
                  fullWidth
                  label="Estimated volume"
                  {...register("estimated_volume", {
                    required: "This field is required",
                    minLength: { value: 1, message: "Minimum 1 character" },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.estimated_volume}
                  helperText={errors.estimated_volume?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Questionnaire completion"
                  {...register("questionnaire_completion", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.questionnaire_completion}
                  helperText={errors.questionnaire_completion?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Nda"
                  {...register("nda_status", {
                    required: "This field is required",
                    minLength: { value: 1, message: "Minimum 1 character" },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.nda_status}
                  helperText={errors.nda_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Mou"
                  {...register("mou_status", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.mou_status}
                  helperText={errors.mou_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Tca"
                  {...register("tca_status", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.tca_status}
                  helperText={errors.tca_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Contract"
                  {...register("contract_status", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.contract_status}
                  helperText={errors.contract_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Bom"
                  {...register("bom_status", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
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
                    label="Price agreement"
                    {...register("price_agreement", {
                      maxLength: {
                        value: 100,
                        message: "Maximum 100 characters",
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
                  label="Project status"
                  control={control}
                  errors={errors}
                  options={projectStatus}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Assembly approach"
                  {...register("assembly_approach", {
                    required: "This field is required",
                    minLength: { value: 1, message: "Minimum 1 character" },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.assembly_approach}
                  helperText={errors.assembly_approach?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Assembly line"
                  {...register("assembly_line", {
                    required: "This field is required",
                    minLength: { value: 1, message: "Minimum 1 character" },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.assembly_line}
                  helperText={errors.assembly_line?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Layout"
                  {...register("layout", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.layout}
                  helperText={errors.layout?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  type="number"
                  fullWidth
                  label="Potential volume"
                  {...register("potential_volume", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.potential_volume}
                  helperText={errors.potential_volume?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SelectField
                  name="due_diligence"
                  label="Due Diligence"
                  control={control}
                  errors={errors}
                  options={dueDiligence}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Controller
                  name="estado"
                  control={control}
                  rules={{
                    required: "Debes seleccionar un estado",
                  }}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Selecciona un estado"
                      {...field}
                      error={!!errors.estado}
                      helperText={errors.estado?.message}
                    >
                      <MenuItem value="">
                        <em>-- Selecciona un estado --</em>
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
              <Grid size={{ xs: 12 }}>
                {yearlyEstimations.map((item, index) => (
                  <Grid container spacing={2} key={index} mb={1}>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        fullWidth
                        label="Year"
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
                        label="Amount"
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
                        Eliminate
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  onClick={addYear}
                  color="error"
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                >
                  + Add year
                </Button>
              </Grid>
              <Grid size={{ xs: 12 }}>
                {monthlyComments.map((item, index) => (
                  <Grid container spacing={2} key={index} mb={1}>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        fullWidth
                        label="Months"
                        value={item.months}
                        onChange={(e) =>
                          handleMonthChange(index, "months", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        fullWidth
                        label="Coments"
                        value={item.comment}
                        onChange={(e) =>
                          handleMonthChange(index, "comment", e.target.value)
                        }
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 2 }}>
                      <Button
                        fullWidth
                        color="error"
                        onClick={() => removeMonth(index)}
                        sx={{ textTransform: "none" }}
                      >
                        Eliminate
                      </Button>
                    </Grid>
                  </Grid>
                ))}

                <Button
                  onClick={addMonth}
                  color="error"
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                >
                  + Add month
                </Button>
              </Grid>
              {documentTypes.map((type) => (
                <Grid key={type} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <FileField
                    name={`documents.${type}`}
                    label={`${type} (New version)`}
                    control={control}
                    errors={errors}
                    currentFile={project?.documents?.[type]}
                  />
                </Grid>
              ))}
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
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
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Main contact supervisor"
                  {...register("main_contact_supervisor", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.main_contact_supervisor}
                  helperText={errors.main_contact_supervisor?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Model family"
                  {...register("model_family", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.model_family}
                  helperText={errors.model_family?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Models"
                  {...register("models", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.models}
                  helperText={errors.models?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Plant line"
                  {...register("plant_line", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.plant_line}
                  helperText={errors.plant_line?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Trademark license agreement"
                  {...register("trademark_license_agreement", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.trademark_license_agreement}
                  helperText={errors.trademark_license_agreement?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Homologation status"
                  {...register("homologation_status", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.homologation_status}
                  helperText={errors.homologation_status?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Estimated SOP"
                  {...register("estimated_sop", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.estimated_sop}
                  helperText={errors.estimated_sop?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Project mgr"
                  {...register("project_mgr", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.project_mgr}
                  helperText={errors.project_mgr?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Pending points legal"
                  {...register("pending_points_legal", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.pending_points_legal}
                  helperText={errors.pending_points_legal?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Support requested"
                  {...register("support_requested", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  error={!!errors.support_requested}
                  helperText={errors.support_requested?.message}
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
              textTransform: "none",
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
              textTransform: "none",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
