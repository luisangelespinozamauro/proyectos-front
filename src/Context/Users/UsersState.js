import React, { useReducer } from "react";
import UsersContext from "./UsersContext";
import UsersReducer from "./UsersReducer";
import MethodGet, { MethodPost, MethodPut } from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_USERS,
  OBTENER_USER,
  ADD_USERS,
  UPDATE_USERS,
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
      Swal.fire("Validation error", mensajes, "warning");
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
          title: "Success",
          text: "User successfully added",
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
          title: "Success",
          text: "User successfully updated",
          icon: "success",
        });
        GetUsers();
      })
      .catch(handleError);
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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
