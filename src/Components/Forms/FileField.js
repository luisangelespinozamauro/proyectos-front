import React from "react";
import { Controller } from "react-hook-form";
import { Typography, Box, Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function FileField({
  name,
  label,
  control,
  rules = {},
  errors,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,ppt,pptx,jpg,jpeg,png,svg",
  disabled = false,
  currentFile,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              borderStyle: "dashed",
              height: 56,
            }}
            disabled={disabled}
          >
            {value
              ? "Cambiar archivo"
              : currentFile
                ? "Reemplazar archivo"
                : "Seleccionar archivo"}

            <input
              type="file"
              hidden
              accept={accept}
              onChange={(e) => {
                const file = e.target.files[0];
                onChange(file);

                e.target.value = null;
              }}
            />
          </Button>

          <Stack spacing={0.5} sx={{ mt: 1 }}>
            {value && (
              <Box display="flex" alignItems="center" gap={1}>
                <InsertDriveFileIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="primary">
                  Nuevo: {value.name}
                </Typography>

                <Button
                  size="small"
                  color="error"
                  onClick={() => onChange(null)}
                >
                  Quitar
                </Button>
              </Box>
            )}

            {!value && currentFile && (
              <Box display="flex" alignItems="center" gap={1}>
                <InsertDriveFileIcon fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Actual: {currentFile?.name || "Archivo existente"}
                </Typography>
              </Box>
            )}

            {!value && !currentFile && (
              <Typography variant="body2" color="text.disabled">
                Sin archivo seleccionado
              </Typography>
            )}
          </Stack>

          {errors?.[name] && (
            <Typography color="error" variant="caption">
              {errors[name].message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}
