import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost } from "../../Config/Service";
import tokenAuth from "../../Config/TokenAuth";
import Swal from "sweetalert2";

import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";
import { ROLES } from "../../utils/roles";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    usuario: {},
    User: {},
    user_me: null,
    cargando: true,
    success: false,
    errorAuth: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const usuarioAutenticado = async (datos) => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    MethodGet("/user")
      .then(({ data }) => {
        localStorage.setItem("role_id", data.user.role_id);
        localStorage.setItem("id", data.user.id);
        dispatch({
          type: OBTENER_USUARIO,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
        });
      });
  };

  const loginExterno = async (collaborator_number) => {
    try {
      const { data } = await MethodPost(`/login/${collaborator_number}`);

      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: data,
      });

      await usuarioAutenticado();
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        localStorage.removeItem("id");
        dispatch({
          type: CERRAR_SESION,
        });

        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href =
            "/https://ldrhsys.ldrhumanresources.com/default.php";
        });
      }
    });
  };

  const manualUsuario = async () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se descargará el manual de usuario",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, descargar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const role_id = localStorage.getItem("role_id");
          const tipo = ROLES(role_id); 

          if (!tipo) {
            throw new Error("Rol inválido");
          }

          const response = await MethodGet(
            `/manual/${tipo}`,
            {},
            { responseType: "blob" },
          );

          const blob = new Blob([response.data], {
            type: "application/pdf",
          });

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `manual-${tipo}.pdf`;
          link.click();

          Swal.fire({
            title: "Descarga exitosa",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "No se pudo descargar",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        user_me: state.user_me,
        success: state.success,
        cargando: state.cargando,
        errorAuth: state.errorAuth,
        usuarioAutenticado,
        loginExterno,
        cerrarSesion,
        manualUsuario,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
