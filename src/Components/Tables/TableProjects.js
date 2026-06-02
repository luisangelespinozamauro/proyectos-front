import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ModalDetalleProjects from "../Modals/ModalDetalleProjects";
import ProjectsContext from "../../Context/Projects/ProjectsContext";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter } from "../../utils/dateFormatter";
import EditProjects from "../../Moduls/Projects/EditProjects";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AddProjects from "../../Moduls/Projects/AddProjects";
import { EstadoChip } from "../../utils/EstadoChip";
import { IconButton, Tooltip } from "@mui/material";
import { formatNumber } from "../../utils/formatters";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BrandsContext from "../../Context/Brands/BrandsContext";

export default function TableProjects({ rows = [] }) {
  const { brands, GetBrands } = useContext(BrandsContext);
  const baseUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "");
  const role_id = Number(localStorage.getItem("role_id"));
  const auth_user_id = Number(localStorage.getItem("id"));
  const allowedUserIds = [5, 6, 13];

  const { project, GetProject } = useContext(ProjectsContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    GetBrands();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetProject(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_project, saveIdProjects] = useState(null);
  const handleClickOpenEdit = (id) => {
    OpenModalUpdate(true);
    saveIdProjects(id);
  };
  const handleClickCloseEdit = () => {
    OpenModalUpdate(false);
    saveIdProjects(null);
  };

  const [modalAdd, setOpenModalAdd] = useState(false);
  const handleClickOpenAdd = () => {
    setOpenModalAdd(true);
  };

  const handleClickCloseAdd = () => {
    setOpenModalAdd(false);
  };

  const totalEstimatedVolume = rows.reduce((acc, item) => {
    return acc + (Number(item.estimated_volume) || 0);
  }, 0);

  const totalEstimatedProduction = rows.reduce((acc, item) => {
    const totalByProject = item.yearly_estimations?.reduce((sum, est) => {
      return sum + (Number(est.amount) || 0);
    }, 0);

    return acc + totalByProject;
  }, 0);

  const dailyProductionAverage = totalEstimatedVolume / 240;

  const getDocumentUrl = (row, type) => {
    const doc = row.documents?.find((d) => d.type === type);

    if (!doc) return null;

    //const version = doc.versions?.[0];
    const version = doc.versions?.[doc.versions.length - 1];

    if (!version) return null;

    return `${baseUrl}/storage/${version.file_path}`;
  };

  const getFileIcon = (url) => {
    if (!url) return null;

    if (url.endsWith(".pdf")) {
      return <PictureAsPdfIcon sx={{ color: "#d32f2f" }} />;
    }

    if (url.endsWith(".doc") || url.endsWith(".docx")) {
      return <DescriptionIcon sx={{ color: "#1976d2" }} />;
    }

    if (url.endsWith(".xls") || url.endsWith(".xlsx")) {
      return <InsertDriveFileIcon sx={{ color: "#2e7d32" }} />;
    }

    if (url.endsWith(".ppt") || url.endsWith(".pptx")) {
      return <InsertDriveFileIcon sx={{ color: "#ed6c02" }} />;
    }

    return <DescriptionIcon />;
  };

  const canManageProject = (project) => {
    // ADMIN o SUPER ADMIN
    if (role_id === 1 || role_id === 2) {
      return true;
    }

    // GERENTE DE MARCA
    if (role_id === 4) {
      return project.brand?.users?.some(
        (brandUser) => Number(brandUser.id) === auth_user_id,
      );
    }

    // usuarios normales
    return false;
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      getActions: (params) => {
        const project = params.row;
        const actions = [
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{ color: "#42A5F5" }} />}
            label="Ver detalles"
            onClick={() => handleClickOpen(params.id)}
          />,
        ];
        const canManage = canManageProject(project);
        if (canManage) {
          actions.push(
            <GridActionsCellItem
              icon={<EditIcon sx={{ color: "#ed6c02" }} />}
              label="Editar"
              onClick={() => handleClickOpenEdit(params.id)}
            />,
          );
        }
        return actions;
      },
    },
    {
      field: "id",
      headerName: "Nr",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        return params.row.brand?.name;
      },
    },
    {
      field: "main_contact_supervisor",
      headerName: "Main contact supervisor",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "model_family",
      headerName: "Model family",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "models",
      headerName: "Models",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "estimated_volume",
      headerName: "Estimated volume",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      valueFormatter: (params) => {
        return formatNumber(Number(params) || 0);
      },
    },
    {
      field: "plant_line",
      headerName: "Plant line",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "questionnaire_completion",
      headerName: "Questionnaire completion",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        const url = getDocumentUrl(params.row, "QUESTIONNAIRE");

        if (!url) return null;

        return (
          <Tooltip title="Ver questionnaire completion">
            <IconButton onClick={() => window.open(url, "_blank")}>
              {getFileIcon(url)}
            </IconButton>
          </Tooltip>
        );
      },
    },

    {
      field: "nda_status",
      headerName: "Nda status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        const url = getDocumentUrl(params.row, "NDA");

        if (!url) return null;

        return (
          <Tooltip title="Ver nda status">
            <IconButton onClick={() => window.open(url, "_blank")}>
              {getFileIcon(url)}
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "mou_status",
      headerName: "Mou",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        const url = getDocumentUrl(params.row, "MOU");

        if (!url) return null;

        return (
          <Tooltip title="Ver mou">
            <IconButton onClick={() => window.open(url, "_blank")}>
              {getFileIcon(url)}
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "tca_status",
      headerName: "Tca",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        const url = getDocumentUrl(params.row, "TCA");

        if (!url) return null;

        return (
          <Tooltip title="Ver tca">
            <IconButton onClick={() => window.open(url, "_blank")}>
              {getFileIcon(url)}
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "trademark_license_agreement",
      headerName: "Trademark license agreement",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "contract_status",
      headerName: "Contract",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      renderCell: (params) => {
        const url = getDocumentUrl(params.row, "CONTRACT");

        if (!url) return null;

        return (
          <Tooltip title="Ver contract">
            <IconButton onClick={() => window.open(url, "_blank")}>
              {getFileIcon(url)}
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "bom_status",
      headerName: "Bom",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => {
        const url = getDocumentUrl(params.row, "BOM");

        if (!url) return null;

        return (
          <Tooltip title="Ver bom">
            <IconButton onClick={() => window.open(url, "_blank")}>
              {getFileIcon(url)}
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "project_status",
      headerName: "Project status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "assembly_approach",
      headerName: "Assembly approach",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "assembly_line",
      headerName: "Assembly line",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "homologation_status",
      headerName: "Homologation status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "estimated_sop",
      headerName: "Estimated sop",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "project_mgr",
      headerName: "Project mgr",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "potential_volume",
      headerName: "Potential volume",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      valueFormatter: (params) => {
        return formatNumber(Number(params) || 0);
      },
    },
    {
      field: "months_comments",
      headerName: "Comments",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      renderCell: (params) => {
        const comments = params.row.months_comments;

        if (!comments || comments.length === 0) {
          return <Typography variant="caption">Sin datos</Typography>;
        }

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {comments.map((item) => (
              <Typography key={item.id} variant="caption">
                {item.months} = {item.comment}
              </Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "next_steps",
      headerName: "Next steps",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "pending_points_legal",
      headerName: "Pending points legal",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "production",
      headerName: "Production",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      renderCell: (params) => {
        const estimations = params.row.yearly_estimations;

        if (!estimations || estimations.length === 0) {
          return <Typography variant="caption">Sin datos</Typography>;
        }

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {estimations.map((item) => (
              <Typography key={item.id} variant="caption">
                {item.year} = {formatNumber(Number(item.amount))}
              </Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "support_requested",
      headerName: "Support requested",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "created_at",
      headerName: "Created at",
      flex: 1,
      minWidth: 200,
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
    // {
    //   field: "price_agreement",
    //   headerName: "Price agreement",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 100,
    //   renderCell: (params) => {
    //     if (!allowedUserIds.includes(auth_user_id)) {
    //       return "No autorizado";
    //     }

    //     const url = getDocumentUrl(params.row, "PRICE");

    //     if (!url) return null;

    //     return (
    //       <Tooltip title="Ver price agreement">
    //         <IconButton onClick={() => window.open(url, "_blank")}>
    //           {getFileIcon(url)}
    //         </IconButton>
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   field: "layout",
    //   headerName: "Layout",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 100,
    //   renderCell: (params) => {
    //     const url = getDocumentUrl(params.row, "LAYOUT");

    //     if (!url) return null;

    //     return (
    //       <Tooltip title="Ver layout">
    //         <IconButton onClick={() => window.open(url, "_blank")}>
    //           {getFileIcon(url)}
    //         </IconButton>
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   field: "model",
    //   headerName: "Model",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 100,
    // },
    // {
    //   field: "product_family",
    //   headerName: "Product family",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 100,
    // },
    // {
    //   field: "comments",
    //   headerName: "Comments",
    //   flex: 1,
    //   minWidth: 200,
    // },
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
          Project list
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
            getRowHeight={() => "auto"}
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
                sortModel: [{ field: "id", sort: "asc" }],
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
                  {role_id !== 3 && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleClickOpenAdd}
                      sx={{ borderRadius: 3, textTransform: "none" }}
                    >
                      New project
                    </Button>
                  )}
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

              // "& .MuiDataGrid-cell": {
              //   borderBottom: "1px solid #e0e0e0",
              //   whiteSpace: "nowrap",
              //   overflow: "hidden",
              //   textOverflow: "ellipsis",
              // },

              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e0e0e0",
                whiteSpace: "normal",
                lineHeight: "1.4rem",
                display: "flex",
                alignItems: "center",
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

        <Box
          sx={{
            mt: 3,
            px: 1,
            py: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">Total estimated volume</Typography>
            <Typography variant="h6" fontWeight={700}>
              {formatNumber(totalEstimatedVolume)}
            </Typography>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "1px",
                height: 40,
                backgroundColor: theme.palette.divider,
              }}
            />
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">
              Producción diaria promedio
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {formatNumber(dailyProductionAverage)}
            </Typography>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                width: "1px",
                height: 40,
                backgroundColor: theme.palette.divider,
              }}
            />
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">Total producción</Typography>
            <Typography variant="h6" fontWeight={700}>
              {formatNumber(totalEstimatedProduction)}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <ModalDetalleProjects
        open={openModal}
        handleClose={handleClose}
        project={project}
      />

      {id_project !== null && (
        <EditProjects
          open={modalUpdate}
          handleClose={handleClickCloseEdit}
          id={id_project}
          brands={brands}
        />
      )}

      <AddProjects
        open={modalAdd}
        handleClose={handleClickCloseAdd}
        brands={brands}
      />
    </>
  );
}
