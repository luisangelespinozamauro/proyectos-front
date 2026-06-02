import React, { useContext, useState } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ModalDetalleBrands from "../Modals/ModalDetalleBrands";
import BrandsContext from "../../Context/Brands/BrandsContext";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter } from "../../utils/dateFormatter";
import EditBrands from "../../Moduls/Brands/EditBrands";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddBrands from "../../Moduls/Brands/AddBrands";
import { EstadoChip } from "../../utils/EstadoChip";

export default function TableBrands({ rows = [] }) {
  const { brand, GetBrand } = useContext(BrandsContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetBrand(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_brand, saveIdBrands] = useState(null);
  const handleClickOpenEdit = (id) => {
    OpenModalUpdate(true);
    saveIdBrands(id);
  };
  const handleClickCloseEdit = () => {
    OpenModalUpdate(false);
    saveIdBrands(null);
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
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },

    {
      field: "name",
      headerName: "Brand",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
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
      type: "singleSelect",
      valueOptions: [
        { value: 1, label: "Inactive" },
        { value: 2, label: "Active" },
      ],
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
          Brands list
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
                    New brand
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
      <ModalDetalleBrands
        open={openModal}
        handleClose={handleClose}
        brand={brand}
      />

      {id_brand !== null && (
        <EditBrands
          open={modalUpdate}
          handleClose={handleClickCloseEdit}
          id={id_brand}
        />
      )}

      <AddBrands open={modalAdd} handleClose={handleClickCloseAdd} />
    </>
  );
}
