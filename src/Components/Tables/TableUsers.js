import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ModalDetalleUser from "../Modals/ModalDetalleUser";
import UsersContext from "../../Context/Users/UsersContext";
import BrandsContext from "../../Context/Brands/BrandsContext";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter } from "../../utils/dateFormatter";
import EditUsers from "../../Moduls/Users/EditUsers";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddUsers from "../../Moduls/Users/AddUsers";
import { EstadoChip } from "../../utils/EstadoChip";
import { ROLES } from "../../utils/roles";

export default function TableUsers({ rows = [] }) {
  const { user, GetUser } = useContext(UsersContext);
  const { brands, GetBrands } = useContext(BrandsContext);

  useEffect(() => {
    GetBrands();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetUser(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_usuario, saveIdUsuario] = useState(null);
  const handleClickOpenEdit = (id) => {
    OpenModalUpdate(true);
    saveIdUsuario(id);
  };
  const handleClickCloseEdit = () => {
    OpenModalUpdate(false);
    saveIdUsuario(null);
  };

  const [modalAdd, setOpenModalAdd] = useState(false);
  const handleClickOpenAdd = () => {
    setOpenModalAdd(true);
  };

  const handleClickCloseAdd = () => {
    setOpenModalAdd(false);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{ color: "#42A5F5" }} />}
            label="Ver detalles"
            onClick={() => handleClickOpen(params.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "#ed6c02" }} />}
            label="Editar"
            onClick={() => handleClickOpenEdit(params.id)}
          />,
        ];
        return actions;
      },
    },
    {
      field: "id",
      headerName: "Id",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "collaborator_number",
      headerName: "Collaborator number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "last_name",
      headerName: "Last name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "role_id",
      headerName: "Rol",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      renderCell: (params) => {
        const rol = ROLES[params.row.role_id];

        return (
          <Box
            sx={{
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {rol}

            {params.row.role_id === 4 && params.row.brands?.length > 0 && (
              <>
                <br />

                <span
                  style={{
                    fontSize: "11px",
                    color: "#757575",
                  }}
                >
                  {params.row.brands.map((brand) => brand.name).join(", ")}
                </span>
              </>
            )}
          </Box>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created at",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => dateFormatter(params.value),
    },
    {
      field: "estado",
      headerName: "Status",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => <EstadoChip estado={params.value} />,
    },
  ];

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eaeaea",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Users list
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: isMobile ? 400 : 500,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            autoHeight={isMobile}
            checkboxSelection={false}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }],
              },
            }}
            slots={{
              toolbar: () => (
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={600}>Total: {rows.length}</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpenAdd}
                    sx={{ borderRadius: 3 }}
                  >
                    New user
                  </Button>
                </Box>
              ),
            }}
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.grey[100],
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: 0.5,
                borderBottom: `2px solid ${theme.palette.primary.main}`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `2px solid ${theme.palette.primary.main}`,
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e0e0e0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },

              "& .MuiDataGrid-columnSeparator": {
                opacity: 0.3,
                cursor: "col-resize",
              },

              "& .MuiDataGrid-columnSeparator:hover": {
                opacity: 1,
                color: theme.palette.primary.main,
              },

              "& .MuiDataGrid-columnHeader:active .MuiDataGrid-columnSeparator":
                {
                  color: theme.palette.primary.main,
                  width: 2,
                },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
                transition: "0.2s ease-in-out",
              },
            }}
          />
        </Box>
      </Paper>
      <ModalDetalleUser
        open={openModal}
        handleClose={handleClose}
        user={user}
      />

      {id_usuario !== null && (
        <EditUsers
          open={modalUpdate}
          handleClose={handleClickCloseEdit}
          id={id_usuario}
          brands={brands}
        />
      )}

      <AddUsers
        open={modalAdd}
        handleClose={handleClickCloseAdd}
        brands={brands}
      />
    </>
  );
}
