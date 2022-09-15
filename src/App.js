import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate";
import AdminEdit from "./components/AdminEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders/:id" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/edit" element={<AdminEdit />} />
      </Routes>
    </div>
  );
}

export default App;
