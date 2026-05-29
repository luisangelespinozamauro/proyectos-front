import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const estadoConfig = {
  1: { label: "Inactive", color: "error" },
  2: { label: "Active", color: "success" },
};

export const EstadoChip = ({ estado }) => {
  const config = estadoConfig[estado] || {
    label: "Unknown",
    color: "default",
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      icon={config.label === "Activo" ? <CheckCircleIcon /> : <CancelIcon />}
      variant="outlined"
    />
  );
};
