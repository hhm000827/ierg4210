import lang from "lodash/lang";
import { memo } from "react";
import { Card } from "../components/card/Card";
import config from "../config/config.json";

const Home = () => {
  const products = config.product;

  return (
    <div className="grid h-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!lang.isEmpty(products) &&
        products.map((product) => (
          <div key={`home-${product.name}`}>
            <Card product={product} />
          </div>
        ))}
    </div>
  );
};

export default memo(Home);
