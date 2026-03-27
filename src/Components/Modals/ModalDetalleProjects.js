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

const ModalDetalleProjects = ({ open, handleClose, project }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "");
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!project) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDocumentsByType = (type) => {
    const doc = project.documents?.find((d) => d.type === type);

    if (!doc || !doc.versions?.length) return [];

    return doc.versions.map((v) => ({
      url: `${baseUrl}/storage/${v.file_path}`,
      version: v.version,
    }));
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
                {
                  label: "NDA STATUS",
                  value: (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <span>{project.nda_status || "-"}</span>

                      {getDocumentsByType("NDA").length > 0 && (
                        <Stack direction="row" spacing={1}>
                          {getDocumentsByType("NDA").map((doc, i) => (
                            <Typography
                              key={i}
                              onClick={() => window.open(doc.url, "_blank")}
                              sx={{
                                cursor: "pointer",
                                fontSize: "0.8rem",
                                px: 1,
                                borderRadius: 1,
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                                "&:hover": {
                                  opacity: 0.8,
                                },
                              }}
                            >
                              V{doc.version}
                            </Typography>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  ),
                },
                { label: "MOU", value: project.mou_status },
                { label: "TCA", value: project.tca_status },
                { label: "CONTRACT", value: project.contract_status },
                { label: "BOM", value: project.bom_status },
                { label: "PRICE AGREEMENT", value: project.price_agreement },
                { label: "PROJECT STATUS", value: project.project_status },
                {
                  label: "ASSEMBLY APPROACH",
                  value: project.assembly_approach,
                },
                { label: "ASSEMBLY LINE", value: project.assembly_line },
                { label: "LAYOUT", value: project.layout },
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
