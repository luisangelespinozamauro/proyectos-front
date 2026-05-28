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
              ? "Change file"
              : currentFile
                ? "Current file"
                : "Upload file"}

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
                  Selected: {value.name}
                </Typography>

                <Button
                  size="small"
                  color="error"
                  onClick={() => onChange(null)}
                >
                  Remove
                </Button>
              </Box>
            )}

            {!value && currentFile && (
              <Box display="flex" alignItems="center" gap={1}>
                <InsertDriveFileIcon fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Current: {currentFile?.name || "No file uploaded"}
                </Typography>
              </Box>
            )}

            {!value && !currentFile && (
              <Typography variant="body2" color="text.disabled">
                No file selected
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
