import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/login/LoginForm";
import AdminPanelLayout from "./page/admin_page/AdminPanelLayout";
import CheckCategory from "./page/admin_page/CheckCategory";
import CheckProduct from "./page/admin_page/CheckProduct";
import CreateCategory from "./page/admin_page/CreateCategory";
import CreateProduct from "./page/admin_page/CreateProduct";
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
          <Route path="CheckProduct" element={<CheckProduct />} />
          <Route path="CreateCategory" element={<CreateCategory />} />
          <Route path="CheckCategory" element={<CheckCategory />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <LoginForm />
    </div>
  );
}

export default App;
