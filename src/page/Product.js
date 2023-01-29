import lang from "lodash/lang";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, ProductDetailCard } from "../components/card/Card";
import config from "../config/config.json";

const Product = () => {
  const [searchParams] = useSearchParams();
  const selectedProduct = lang.isNil(searchParams.get("pid"))
    ? config.product.filter((item) => lang.isEqual(item.cid, Number(searchParams.get("cid"))))
    : config.product.find((item) => lang.isEqual(item.pid, Number(searchParams.get("pid"))));

  return lang.isNil(searchParams.get("pid")) ? (
    <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!lang.isEmpty(selectedProduct) &&
        selectedProduct.map((product) => (
          <div key={`$search-${product.name}`}>
            <Card product={product} />
          </div>
        ))}
    </div>
  ) : (
    <div>{selectedProduct && <ProductDetailCard product={selectedProduct} />}</div>
  );
};

export default memo(Product);
