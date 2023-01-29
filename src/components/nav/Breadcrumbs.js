import lang from "lodash/lang";
import { Link, useSearchParams } from "react-router-dom";
import config from "../../config/config.json";

const Breadcrumbs = () => {
  const [searchParams] = useSearchParams();
  let category = config.category.find((item) => lang.isEqual(item.cid, Number(searchParams.get("cid"))));
  let product = config.product.find((item) => lang.isEqual(item.pid, Number(searchParams.get("pid"))));

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!lang.isNil(searchParams.get("cid")) && lang.isNil(searchParams.get("pid")) && (
          <li>
            <Link to={`/Search?cid=${searchParams.get("cid")}`}>{category.name}</Link>
          </li>
        )}
        {!lang.isNil(searchParams.get("pid")) && (
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
