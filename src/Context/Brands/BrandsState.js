import React, { useReducer } from "react";
import BrandsContext from "./BrandsContext";
import BrandsReducer from "./BrandsReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
} from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_ALL_BRANDS,
  OBTENER_BRANDS,
  ADD_BRANDS,
  UPDATE_BRANDS,
} from "../../types";
import imageHeaders from "../../Config/ImageHeaders";

const BrandsState = ({ children }) => {
  const initialState = {
    brands: [],
    brand: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(BrandsReducer, initialState);

  const handleError = (error) => {
    if (!error.response) {
      Swal.fire("Error", "Error de conexión con el servidor", "error");
      return;
    }
    const { status, data } = error.response;
    if (status === 422 && data.errors) {
      const mensajes = Object.entries(data.errors)
        .map(([campo, errores]) => `• ${errores.join(", ")}`)
        .join("\n");
      Swal.fire({
        title: "Error de validación",
        text: mensajes,
        icon: "warning",
      });
      return;
    }
    if (data.message) {
      Swal.fire("Error", data.message, "error");
      return;
    }
    Swal.fire("Error", "Ocurrió un error inesperado", "error");
  };

  const GetBrands = () => {
    MethodGet("/brands")
      .then((res) => {
        dispatch({
          type: GET_ALL_BRANDS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetBrand = (id) => {
    MethodGet(`/brands/${id}`)
      .then((res) => {
        dispatch({
          type: OBTENER_BRANDS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };


  const CreateBrands = (data) => {
    MethodPost("/brands", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_BRANDS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Marca agregada con éxito",
          icon: "success",
        });
        GetBrands();
      })
      .catch(handleError);
  };

  const UpdateBrands = (data) => {
    MethodPut(`/brands/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_BRANDS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Marca actualizada con éxito",
          icon: "success",
        });
        GetBrands();
      })
      .catch(handleError);
  };

  return (
    <BrandsContext.Provider
      value={{
        brands: state.brands,
        brand: state.brand,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetBrands,
        GetBrand,
        CreateBrands,
        UpdateBrands,
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
};

export default BrandsState;
