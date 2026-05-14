import { GET_ALL_ROLES, OBTENER_ROLES } from "../../types";

const RolesReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_ROLES:
      return {
        ...state,
        roles: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_ROLES:
      return {
        ...state,
        role: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default RolesReducer;
