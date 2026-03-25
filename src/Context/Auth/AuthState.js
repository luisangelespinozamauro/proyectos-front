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
        localStorage.setItem("rolid", data.user.rolid);
        localStorage.setItem("idusuario", data.user.idusuario);
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

  const loginExterno = async (numcolaborador) => {
    try {
      const { data } = await MethodPost(`/login/${numcolaborador}`);

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
        localStorage.removeItem("rolid");
        localStorage.removeItem("idusuario");
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
