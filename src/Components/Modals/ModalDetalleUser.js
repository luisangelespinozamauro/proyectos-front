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
import { ROLES } from "../../utils/roles";

const ModalDetalleUser = ({ open, handleClose, user }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!user) return null;

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
            Detalle del Usuario
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
                { label: "ID", value: user.id },
                { label: "NUM. COLABORADOR", value: user.collaborator_number },
                { label: "NOMBRE", value: user.name },
                { label: "APELLIDOS", value: user.last_name },
                { label: "TELÉFONO", value: user.phone },
                { label: "CORREO", value: user.email },
                {
                  label: "ROL",
                  value: ROLES[user.role_id] || "Sin rol",
                },
                {
                  label: "FECHA DE REGISTRO",
                  value: dateFormatter(user.created_at),
                },
                {
                  label: "ESTADO",
                  value: <EstadoChip estado={user.estado} />,
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

export default ModalDetalleUser;
