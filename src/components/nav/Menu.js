import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul className="menu bg-slate-600 w-auto h-auto  text-white text-sm">
      <li className="hover-bordered">
        <Link to="/AdminPanel/CreateProduct">Create Product</Link>
      </li>
      <li className="hover-bordered">
        <Link to="/AdminPanel/UpdateProduct">Update Product</Link>
      </li>
      <li className="hover-bordered">
        <Link to="/AdminPanel/DeleteProduct">Delete Product</Link>
      </li>
    </ul>
  );
};

export default Menu;
