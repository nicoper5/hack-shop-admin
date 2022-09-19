import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate";
import AdminEdit from "./components/AdminEdit";
import Collections from "./components/Collections";
import CollectionCreate from "./components/CollectionCreate";
import CollectionEdit from "./components/CollectionEdit";
import Products from "./components/Products";
import OrderEdit from "./components/OrderEdit";
import ProductCreate from "./components/ProductCreate";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/orders/edit/:id" element={<OrderEdit />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/edit/:id" element={<AdminEdit />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/create" element={<CollectionCreate />} />
          <Route path="/collection/edit/:slug" element={<CollectionEdit />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
