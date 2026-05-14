import { GET_ALL_BRANDS, OBTENER_BRANDS } from "../../types";

const BrandsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_BRANDS:
      return {
        ...state,
        brands: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case OBTENER_BRANDS:
      return {
        ...state,
        brand: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default BrandsReducer;



