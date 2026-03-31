import React from "react";
import { Controller } from "react-hook-form";
import { Typography, Box } from "@mui/material";

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

          <input
            type="file"
            accept={accept}
            disabled={disabled}
            onChange={(e) => {
              const file = e.target.files[0];
              onChange(file);
            }}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "6px",
              width: "100%",
            }}
          />

          {!value && currentFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Archivo actual: {currentFile.name}
            </Typography>
          )}

          {value && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Nuevo archivo: {value.name}
            </Typography>
          )}

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
