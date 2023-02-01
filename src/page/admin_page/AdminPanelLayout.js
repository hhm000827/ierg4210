import { memo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/nav/Menu";
import Navbar from "../../components/nav/Navbar";

const AdminPanelLayout = () => {
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
};

export default memo(AdminPanelLayout);
