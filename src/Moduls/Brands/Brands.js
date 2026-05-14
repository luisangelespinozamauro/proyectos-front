import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableBrands from "../../Components/Tables/TableBrands";
import BrandsContext from "../../Context/Brands/BrandsContext";

const Brands = () => {
  const { brands, GetBrands } = useContext(BrandsContext);

  useEffect(() => {
    GetBrands();
  }, []);

  return (
    <Layout>
      <TableBrands rows={brands} />
    </Layout>
  );
};

export default Brands;
