import lang from "lodash/lang";
import string from "lodash/string";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailCard } from "../components/card/Card";
import config from "../config/config.json";

const Product = () => {
  let { product } = useParams();

  const selectedProduct = config.product.find((item) => lang.isEqual(string.startCase(item.name), string.startCase(product)));

  return <div>{selectedProduct && <ProductDetailCard product={selectedProduct} />}</div>;
};

export default memo(Product);
