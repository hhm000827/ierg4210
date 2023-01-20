import ShoppingCart from "../shoppingCart/ShoppingCart";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 navbar bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-gray-800 text-xl">
          IERG4210 Online Store
        </Link>
      </div>
      <div className="navbar-end">
        <ShoppingCart />
      </div>
    </div>
  );
};

export default Navbar;
