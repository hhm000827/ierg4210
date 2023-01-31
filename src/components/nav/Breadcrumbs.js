import axios from "axios";
import lang from "lodash/lang";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Breadcrumbs = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!lang.isNil(searchParams.get("pid")))
      axios
        .get(`${process.env.React_App_API}/api/getFilteredProducts?pid=${Number(searchParams.get("pid"))}`)
        .then((res) => setProduct(res.data))
        .catch((e) => console.error(e));

    if (!lang.isNil(searchParams.get("cid")))
      axios
        .get(`${process.env.React_App_API}/api/getAllCategory`)
        .then((res) => setCategory(res.data.find((item) => lang.isEqual(Number(searchParams.get("cid")), item.cid))))
        .catch((e) => console.error(e));
  }, [searchParams]);

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!lang.isNil(searchParams.get("cid")) && lang.isNil(searchParams.get("pid")) && category && (
          <li>
            <Link to={`/Search?cid=${searchParams.get("cid")}`}>{category.name}</Link>
          </li>
        )}
        {!lang.isNil(searchParams.get("pid")) && lang.isNil(searchParams.get("cid")) && product && (
          <>
            <li>
              <Link to={`/Search?cid=${product.cid}`}>{product.category}</Link>
            </li>
            <li>
              <Link to={`/Search?pid=${searchParams.get("pid")}`}>{product.name}</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
