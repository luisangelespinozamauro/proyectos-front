import React, { useReducer } from "react";
import PermisosContext from "./PermisosContext";
import PermisosReducer from "./PermisosReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_PERMISOS,
  OBTENER_PERMISOS,
  ADD_PERMISOS,
  UPDATE_PERMISOS,
} from "../../types";
import imageHeaders from "../../Config/ImageHeaders";

const PermisosState = ({ children }) => {
  const initialState = {
    permisos: [],
    permiso: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(PermisosReducer, initialState);

  const handleError = (error) => {
    if (!error.response) {
      Swal.fire("Error", "Error de conexión con el servidor", "error");
      return;
    }
    const { status, data } = error.response;
    if (status === 422 && data.errors) {
      const mensajes = Object.entries(data.errors)
        .map(([campo, errores]) => `• ${errores.join(", ")}`)
        .join("\n");
      Swal.fire({
        title: "Error de validación",
        text: mensajes,
        icon: "warning",
      });
      return;
    }
    if (data.message) {
      Swal.fire("Error", data.message, "error");
      return;
    }
    Swal.fire("Error", "Ocurrió un error inesperado", "error");
  };

  const GetPermisos = () => {
    MethodGet("/permisos")
      .then((res) => {
        dispatch({
          type: GET_ALL_PERMISOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetPermiso = (id) => {
    MethodGet(`/permisos/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_PERMISOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreatePermisos = (data) => {
    MethodPost("/permisos", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_PERMISOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Permiso agregado con éxito",
          icon: "success",
        });
        GetPermisos();
      })
      .catch(handleError);
  };

  const UpdatePermisos = (data) => {
    MethodPut(`/permisos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_PERMISOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Permiso actualizado con éxito",
          icon: "success",
        });
        GetPermisos();
      })
      .catch(handleError);
  };

  return (
    <PermisosContext.Provider
      value={{
        permisos: state.permisos,
        permiso: state.permiso,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetPermisos,
        GetPermiso,
        CreatePermisos,
        UpdatePermisos,
      }}
    >
      {children}
    </PermisosContext.Provider>
  );
};

export default PermisosState;
