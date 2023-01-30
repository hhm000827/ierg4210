import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, ProductDetailCard } from "../components/card/Card";

const Product = () => {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    //determine which card tyoe should use base on the existence of pid
    lang.isNil(searchParams.get("pid"))
      ? axios
          .get(`http://13.112.244.194:8000/api/getFilteredProducts?cid=${Number(searchParams.get("cid"))}`)
          .then((res) => setSelectedProduct(res.data))
          .catch((e) => console.error(e))
      : axios
          .get(`http://13.112.244.194:8000/api/getFilteredProducts?pid=${Number(searchParams.get("pid"))}`)
          .then((res) => setSelectedProduct(res.data))
          .catch((e) => console.error(e));
  }, [searchParams]);

  return lang.isNil(searchParams.get("pid")) ? (
    <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!lang.isEmpty(selectedProduct) &&
        lang.isArray(selectedProduct) &&
        selectedProduct.map((product) => (
          <div key={`$search-${product.name}`}>
            <Card product={product} />
          </div>
        ))}
    </div>
  ) : (
    <div>{selectedProduct && lang.isObject(selectedProduct) && <ProductDetailCard product={selectedProduct} />}</div>
  );
};

export default memo(Product);
