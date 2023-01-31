import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPanelLayout from "./page/admin_page/AdminPanelLayout";
import CreateProduct from "./page/admin_page/CreateProduct";
import DeleteProduct from "./page/admin_page/DeleteProduct";
import UpdateProduct from "./page/admin_page/UpdateProduct";
import Home from "./page/Home";
import Layout from "./page/Layout";
import NoPage from "./page/NoPage";
import Product from "./page/Product";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Search" element={<Product />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/AdminPanel" element={<AdminPanelLayout />}>
          <Route path="CreateProduct" element={<CreateProduct />} />
          <Route path="DeleteProduct" element={<DeleteProduct />} />
          <Route path="UpdateProduct" element={<UpdateProduct />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
