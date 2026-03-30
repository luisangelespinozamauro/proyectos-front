import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dateFormatter } from "../../utils/dateFormatter";
import { EstadoChip } from "../../utils/EstadoChip";
import { formatNumber } from "../../utils/formatters";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Tooltip } from "@mui/material";

const ModalDetalleProjects = ({ open, handleClose, project }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "");
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!project) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFileConfig = (url) => {
    if (!url) return {};

    if (url.endsWith(".pdf")) {
      return {
        icon: <PictureAsPdfIcon sx={{ color: "#d32f2f", fontSize: 18 }} />,
        action: () => window.open(url, "_blank"),
      };
    }

    if (url.endsWith(".doc") || url.endsWith(".docx")) {
      return {
        icon: <DescriptionIcon sx={{ color: "#1976d2", fontSize: 18 }} />,
        action: () => downloadFile(url),
      };
    }

    if (url.endsWith(".xls") || url.endsWith(".xlsx")) {
      return {
        icon: <InsertDriveFileIcon sx={{ color: "#2e7d32", fontSize: 18 }} />,
        action: () => downloadFile(url),
      };
    }

    if (url.endsWith(".ppt") || url.endsWith(".pptx")) {
      return {
        icon: <InsertDriveFileIcon sx={{ color: "#ed6c02", fontSize: 18 }} />,
        action: () => downloadFile(url),
      };
    }

    return {
      icon: <DescriptionIcon sx={{ fontSize: 18 }} />,
      action: () => downloadFile(url),
    };
  };

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const renderDocumentVersions = (type, label) => {
    const doc = project.documents?.find((d) => d.type === type);

    if (!doc) {
      return { label, value: "-" };
    }

    return {
      label,
      value: (
        <Stack spacing={1}>
          <Typography fontSize="0.85rem">
            {project[`${type.toLowerCase()}_status`] || "-"}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {doc.versions.map((v, i) => {
              const url = `${baseUrl}/storage/${v.file_path}`;
              const { icon, action } = getFileConfig(url);
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      cursor: "pointer",
                      px: 1,
                      py: 0.3,
                      borderRadius: 2,
                      backgroundColor: theme.palette.grey[100],
                      border: `1px solid ${theme.palette.divider}`,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    {icon}

                    <Tooltip
                      title={`Subido: ${dateFormatter(v.created_at)}`}
                      arrow
                    >
                      <Typography fontSize="0.75rem" fontWeight={600}>
                        Versión{v.version}
                      </Typography>
                    </Tooltip>
                  </Stack>
                </a>
              );
            })}
          </Stack>
        </Stack>
      ),
    };
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={700}>
            Detalle del proyecto
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 48,
            "& .MuiTab-root": {
              minHeight: 48,
              textTransform: "none",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Información" />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table>
            <TableBody>
              {[
                { label: "NR", value: project.id },
                { label: "BRAND", value: project.brand },
                { label: "MODEL", value: project.model },
                { label: "PRODUCT FAMILY", value: project.product_family },
                {
                  label: "ESTIMATED VOLUME",
                  value: formatNumber(project.estimated_volume),
                },
                {
                  label: "QUESTIONNAIRE COMPLETION",
                  value: project.questionnaire_completion,
                },
                { label: "NDA STATUS", value: project.nda_status },
                renderDocumentVersions("NDA", "NDA"),
                { label: "MOU", value: project.mou_status },
                renderDocumentVersions("MOU", "MOU"),
                { label: "TCA", value: project.tca_status },
                renderDocumentVersions("TCA", "TCA"),
                { label: "CONTRACT", value: project.contract_status },
                renderDocumentVersions("CONTRACT", "CONTRACT"),
                { label: "BOM", value: project.bom_status },
                renderDocumentVersions("BOM", "BOM"),
                { label: "PRICE AGREEMENT", value: project.price_agreement },
                renderDocumentVersions("PRICE", "PRICE AGREEMENT"),
                { label: "PROJECT STATUS", value: project.project_status },
                {
                  label: "ASSEMBLY APPROACH",
                  value: project.assembly_approach,
                },
                { label: "ASSEMBLY LINE", value: project.assembly_line },
                { label: "LAYOUT", value: project.layout },
                renderDocumentVersions("LAYOUT", "LAYOUT"),
                {
                  label: "PRODUCTION",
                  value: formatNumber(project.production_2026),
                },
                {
                  label: "POTENTIAL VOLUME",
                  value: formatNumber(project.potential_volume),
                },
                { label: "COMMENTS", value: project.comments },
                { label: "NEXT STEPS", value: project.next_steps },
                {
                  label: "Fecha de registro",
                  value: dateFormatter(project.created_at),
                },
                {
                  label: "Estado",
                  value: <EstadoChip estado={project.estado} />,
                },
              ].map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      width: "35%",
                      color: theme.palette.text.secondary,
                      borderRight: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {row.label}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {row.value || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleProjects;
