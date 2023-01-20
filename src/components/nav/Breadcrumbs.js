import string from "lodash/string";
import { Link, useParams } from "react-router-dom";

const Breadcrumbs = () => {
  let { category, product } = useParams();

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {category && (
          <li>
            <Link to={`/${category}`}>{string.startCase(category)}</Link>
          </li>
        )}
        {product && category && (
          <li>
            <Link to={`/${category}/${product}`}>{string.startCase(product)}</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
