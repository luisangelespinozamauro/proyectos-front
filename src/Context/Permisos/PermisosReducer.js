import { GET_ALL_PERMISOS, OBTENER_PERMISOS } from "../../types";

const PermisosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PERMISOS:
      return {
        ...state,
        permisos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_PERMISOS:
      return {
        ...state,
        permiso: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default PermisosReducer;
