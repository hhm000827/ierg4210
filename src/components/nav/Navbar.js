import axios from "axios";
import lang from "lodash/lang";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCart from "../shoppingCart/ShoppingCart";

const Navbar = () => {
  const isLogin = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await axios
        .get(`${process.env.React_App_API}/api/verify`, { withCredentials: true })
        .then((res) => {
          if (lang.isEqual(res.data, true)) setIsAdmin(res.data);
        })
        .catch((err) => console.log(err.data));
    };

    verify();
  }, []);

  window.addEventListener("storage", () => {
    axios
      .get(`${process.env.React_App_API}/api/verify`, { withCredentials: true })
      .then((res) => {
        if (lang.isEqual(res.data, true)) setIsAdmin(res.data);
      })
      .catch((err) => console.log(err.data));
  });

  return (
    <div className="sticky top-0 z-50 navbar bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="navbar-start gap-2">
        {/* account button */}
        <div className="dropdown dropdown-bottom">
          <div className="tooltip tooltip-bottom" data-tip="Account">
            <label tabIndex={0} className="btn btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </label>
          </div>
          <ul tabIndex={0} className="menu dropdown-content shadow bg-base-100 rounded-box w-fit">
            <li className="disabled m-2 ml-4 text-left">{isLogin.name ? isLogin.name : "guest"}</li>
            <li>
              <label htmlFor="loginForm" className={`btn btn-ghost normal-case font-normal rounded-2xl ${isLogin.isLogin && "hidden disabled"}`}>
                Login
              </label>
            </li>
            <li>
              <button
                className={`${!isLogin.isLogin && "hidden disabled"}`}
                onClick={(e) => {
                  dispatch({ type: "logout" });
                  setIsAdmin(false);
                }}
              >
                Logout
              </button>
            </li>
            <li>
              <label htmlFor="passwordForm" className={`btn btn-ghost normal-case font-normal text-left rounded-none ${!isLogin.isLogin && "hidden disabled"}`}>
                Change Password
              </label>
            </li>
            <li>
              <button className={`${!isLogin.isLogin && "hidden disabled"}`}>Record</button>
            </li>
          </ul>
        </div>
        {/* admin panel button */}
        {isAdmin && (
          <div className="tooltip tooltip-bottom" data-tip="Admin Panel">
            <Link to="/AdminPanel" className="btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" color="black">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-gray-800 text-xl font-serif">
          Figure
        </Link>
      </div>
      <div className="navbar-end">
        <ShoppingCart />
      </div>
    </div>
  );
};

export default Navbar;
