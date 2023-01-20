import { memo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Breadcrumbs from "../components/nav/Breadcrumbs";
import Drawer from "../components/nav/Drawer";
import Navbar from "../components/nav/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row gap-4">
        <Drawer />
        <div className="flex flex-col gap-1 w-full">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default memo(Layout);
