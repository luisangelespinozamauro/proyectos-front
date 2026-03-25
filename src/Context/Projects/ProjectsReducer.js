import { GET_ALL_PROJECTS, OBTENER_PROJECTS } from "../../types";

const ProjectsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default ProjectsReducer;

