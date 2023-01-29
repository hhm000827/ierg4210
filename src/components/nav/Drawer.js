import lang from "lodash/lang";
import { Link } from "react-router-dom";
import config from "../../config/config.json";
// for phase 1 only, will use axios to connect db to check how many kinds of category and then show in drawer
const categories = config.category;

const Drawer = () => {
  return (
    <div className="drawer drawer-side w-auto h-auto">
      <ul className="menu p-4 w-auto bg-gradient-to-t from-indigo-400 to-indigo-700  text-white">
        <li>Category</li>
        {!lang.isEmpty(categories) &&
          categories.map((category) => {
            return (
              <li key={category.cid}>
                <Link className="text-left" to={`/Search?cid=${category.cid}`}>
                  {category.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Drawer;
