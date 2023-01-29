import lang from "lodash/lang";
import string from "lodash/string";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config/config.json";
import { setSearchKeyword } from "./NavSlice";
// for phase 1 only, will use axios to connect db to check how many kinds of category and then show in drawer
const categories = config.category;

const Drawer = () => {
  const dispatch = useDispatch();
  // for parameter in url (change all parameters to snake case)
  let urlCategoryParams;
  if (!lang.isEmpty(categories)) urlCategoryParams = categories.map((category) => string.snakeCase(category.name));

  return (
    <div className="drawer drawer-side w-auto h-auto">
      <ul className="menu p-4 w-auto bg-gradient-to-t from-indigo-400 to-indigo-700  text-white">
        <li>Category</li>
        {!lang.isEmpty(categories) &&
          categories.map((category, index) => {
            return (
              <li key={category.cid}>
                <Link className="text-left" to={`/${urlCategoryParams[index]}`} onClick={() => dispatch(setSearchKeyword(category))}>
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
