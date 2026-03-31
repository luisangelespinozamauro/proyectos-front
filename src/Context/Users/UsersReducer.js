import { GET_ALL_USERS, OBTENER_USER } from "../../types";

const UsersReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_USER:
      return {
        ...state,
        user: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default UsersReducer;

