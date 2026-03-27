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

const ModalDetalleProjects = ({ open, handleClose, project }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!project) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>NR:</strong>
                </TableCell>
                <TableCell>{project.id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>BRAND:</strong>
                </TableCell>
                <TableCell>{project.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>MODEL:</strong>
                </TableCell>
                <TableCell>{project.model}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>PRODUCT FAMILY:</strong>
                </TableCell>
                <TableCell>{project.product_family}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>ESTIMATED VOLUME:</strong>
                </TableCell>
                <TableCell>{project.estimated_volume}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>QUESTIONNAIRE COMPLETION:</strong>
                </TableCell>
                <TableCell>{project.questionnaire_completion}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>NDA STATUS:</strong>
                </TableCell>
                <TableCell>{project.nda_status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>MOU:</strong>
                </TableCell>
                <TableCell>{project.mou_status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>TCA:</strong>
                </TableCell>
                <TableCell>{project.tca_status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>CONTRACT:</strong>
                </TableCell>
                <TableCell>{project.contract_status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>BOM:</strong>
                </TableCell>
                <TableCell>{project.bom_status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>PRICE AGREEMENT:</strong>
                </TableCell>
                <TableCell>{project.price_agreement}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>PROJECT STATUS:</strong>
                </TableCell>
                <TableCell>{project.project_status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>ASSEMBLY APPROACH:</strong>
                </TableCell>
                <TableCell>{project.assembly_approach}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>ASSEMBLY LINE:</strong>
                </TableCell>
                <TableCell>{project.assembly_line}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>LAYOUT:</strong>
                </TableCell>
                <TableCell>{project.layout}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>PRODUCTION:</strong>
                </TableCell>
                <TableCell>{project.production_2026}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>POTENTIAL VOLUME:</strong>
                </TableCell>
                <TableCell>{project.potential_volume}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>COMMENTS:</strong>
                </TableCell>
                <TableCell>{project.comments}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>NEXT STEPS:</strong>
                </TableCell>
                <TableCell>{project.next_steps}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>Fecha de registro:</strong>
                </TableCell>
                <TableCell>{dateFormatter(project.created_at)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <strong>Estado:</strong>
                </TableCell>
                <TableCell>
                  <EstadoChip estado={project.estado} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleProjects;
