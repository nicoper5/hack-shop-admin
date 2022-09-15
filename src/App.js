import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate";
import AdminEdit from "./components/AdminEdit";
import Collections from "./components/Collections";
import CollectionCreate from "./components/Collections";
import CollectionEdit from "./components/CollectionEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders/:id" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection/create" element={<CollectionCreate />} />
        <Route path="/collection/edit/:id" element={<CollectionEdit />} />
      </Routes>
    </div>
  );
}

export default App;
