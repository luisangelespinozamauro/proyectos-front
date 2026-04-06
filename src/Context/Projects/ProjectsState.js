import React, { useReducer } from "react";
import ProjectsContext from "./ProjectsContext";
import ProjectsReducer from "./ProjectsReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_PROJECTS,
  OBTENER_PROJECTS,
  ADD_PROJECTS,
  UPDATE_PROJECTS,
  DELETE_PROJECTS,
} from "../../types";
import imageHeaders from "../../Config/ImageHeaders";

const ProjectsState = ({ children }) => {
  const initialState = {
    projects: [],
    project: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ProjectsReducer, initialState);

  const handleError = (error) => {
    if (!error.response) {
      Swal.fire("Error", "Error de conexión con el servidor", "error");
      return;
    }

    const { status, data } = error.response;

    if (status === 422 && data.errors) {
      const mensajes = Object.values(data.errors).flat().join("\n");
      Swal.fire("Error de validación", mensajes, "warning");
    } else if (data.message) {
      Swal.fire("Error", data.message, "error");
    } else {
      Swal.fire("Error", "Ocurrió un error inesperado", "error");
    }
  };

  const GetProjects = () => {
    MethodGet("/projects")
      .then((res) => {
        dispatch({
          type: GET_ALL_PROJECTS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetProject = (id) => {
    MethodGet(`/projects/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_PROJECTS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateProjects = (data) => {
    MethodPost("/projects", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_PROJECTS, payload: res.data });
        Swal.fire("Éxito", "Proyecto agregado con éxito", "success");
        GetProjects();
      })
      .catch(handleError);
  };

  const UpdateProjects = (id, data) => {
    const request =
      data instanceof FormData
        ? MethodPost(`/projects/${id}?_method=PUT`, data, imageHeaders)
        : MethodPut(`/projects/${id}`, data);

    request
      .then((res) => {
        dispatch({ type: UPDATE_PROJECTS, payload: res.data });
        Swal.fire("Éxito", "Proyecto actualizado con éxito", "success");
        GetProjects();
      })
      .catch(handleError);
  };

  const DeleteProjects = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El proyecto seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/projects/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_PROJECTS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetProjects();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetProjects,
        GetProject,
        CreateProjects,
        UpdateProjects,
        DeleteProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsState;
