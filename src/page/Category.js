import lang from "lodash/lang";
import string from "lodash/string";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/card/Card";
import config from "../config/config.json";

const Category = () => {
  let { category } = useParams();

  const products = config.product.filter((item) => lang.isEqual(string.startCase(item.category), string.startCase(category)));

  return (
    <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!lang.isEmpty(products) &&
        products.map((product) => (
          <div key={`${category}-${product.name}`}>
            <Card product={product} />
          </div>
        ))}
    </div>
  );
};

export default memo(Category);
