import React from "react";
import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

export default function SelectField({
  name,
  label,
  control,
  rules = {},
  errors,
  options = [],
  disabled,
  optionValue = "id",
  getOptionLabel,
  defaultOption = "Selecciona una opción",
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          select
          fullWidth
          disabled={disabled}
          label={label}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
        >
          <MenuItem value="">
            <em>{defaultOption}</em>
          </MenuItem>

          {options.map((item) => (
            <MenuItem key={item[optionValue]} value={item[optionValue]}>
              {getOptionLabel ? getOptionLabel(item) : item.nombre}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
