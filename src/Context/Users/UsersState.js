import React, { useReducer } from "react";
import UsersContext from "./UsersContext";
import UsersReducer from "./UsersReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_USERS,
  OBTENER_USER,
  ADD_USERS,
  UPDATE_USERS,
  DELETE_USERS,
} from "../../types";

const UsersState = ({ children }) => {
  const initialState = {
    users: [],
    user: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

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

  const GetUsers = () => {
    MethodGet("/users")
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetUser = (id) => {
    MethodGet(`/users/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_USER,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateUsers = (data) => {
    MethodPost("/users", data)
      .then((res) => {
        dispatch({ type: ADD_USERS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Usuario agregado con éxito",
          icon: "success",
        });
        GetUsers();
      })
      .catch(handleError);
  };

  const UpdateUsers = (data) => {
    MethodPut(`/users/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_USERS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Usuario actualizado con éxito",
          icon: "success",
        });
        GetUsers();
      })
      .catch(handleError);
  };

  const DeleteUsers = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/users/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_USERS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetUsers();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        user: state.user,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetUsers,
        GetUser,
        CreateUsers,
        UpdateUsers,
        DeleteUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
