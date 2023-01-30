import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { Card } from "../components/card/Card";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.112.244.194:8000/api/getAllProduct")
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e));
  }, []);

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
