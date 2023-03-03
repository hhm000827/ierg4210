import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Axios } from "../../components/axios/Axios";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";

const AdminPanelLayout = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const verify = async () => {
      await Axios.get(`/api/verify`)
        .then((res) => {
          lang.isEqual(res.data, true) ? setIsAdmin(res.data) : setIsAdmin(res.false);
        })
        .catch((err) => console.log(err.data));
    };

    verify();
  }, []);

  if (lang.isEqual(isAdmin, true))
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row gap-4">
          <Menu />
          <div className="w-full flex justify-center my-5">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  else if (lang.isEqual(isAdmin, false) || lang.isUndefined(isAdmin)) {
    window.location.assign("/");
  }
};

export default memo(AdminPanelLayout);
