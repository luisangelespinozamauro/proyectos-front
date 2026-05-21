import React, { useReducer } from "react";
import RolesContext from "./RolesContext";
import RolesReducer from "./RolesReducer";
import MethodGet, { MethodPost, MethodPut } from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_ROLES,
  OBTENER_ROLES,
  ADD_ROLES,
  UPDATE_ROLES,
} from "../../types";
import imageHeaders from "../../Config/ImageHeaders";

const RolesState = ({ children }) => {
  const initialState = {
    roles: [],
    role: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(RolesReducer, initialState);

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

  const GetRoles = () => {
    MethodGet("/roles")
      .then((res) => {
        dispatch({
          type: GET_ALL_ROLES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetRole = (id) => {
    MethodGet(`/roles/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_ROLES,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateRoles = (data) => {
    MethodPost("/roles", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_ROLES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Rol agregado con éxito",
          icon: "success",
        });
        GetRoles();
      })
      .catch(handleError);
  };

  const UpdateRoles = (data) => {
    MethodPut(`/roles/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_ROLES, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Rol actualizado con éxito",
          icon: "success",
        });
        GetRoles();
      })
      .catch(handleError);
  };

  return (
    <RolesContext.Provider
      value={{
        roles: state.roles,
        role: state.role,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetRoles,
        GetRole,
        CreateRoles,
        UpdateRoles,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

export default RolesState;
