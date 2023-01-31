import { Link } from "react-router-dom";
import ShoppingCart from "../shoppingCart/ShoppingCart";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 navbar bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="navbar-start gap-2">
        <div className="tooltip tooltip-bottom" data-tip="Login">
          <button className="btn btn-circle ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </button>
        </div>
        <Link to="/AdminPanel" className="btn normal-case text-sm btn-sm bg-purple-500 border-purple-500 text-white">
          Admin Panel
        </Link>
      </div>
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
