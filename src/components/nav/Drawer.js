import axios from "axios";
import lang from "lodash/lang";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Drawer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.React_App_API}/api/getAllCategory`)
      .then((res) => setCategories(res.data))
      .catch((e) => console.error(e));
  }, []);

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
