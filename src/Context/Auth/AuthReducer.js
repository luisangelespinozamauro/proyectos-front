import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
} from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };
    case LOGIN_EXITOSO:
      return {
        ...state,
        autenticado: true,
        cargando: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        autenticado: false,
        token: null,
        cargando: false,
        errorAuth: "No está autenticado",
      };
    default:
      return state;
  }
};

export default AuthReducer;
