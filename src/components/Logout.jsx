import { useDispatch } from "react-redux";
import { clearToken } from "../redux/adminSlice";
import NavigationTemplate from "./NavigationTemplate";
import Sidebar from "./Sidebar";

function Logout() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearToken());
  };
  return (
    <>
      <NavigationTemplate />
      <Sidebar />
      <div className="container">
        <h3 className="my-5 fw-bold text-start">Logout</h3>
        <hr />
        <div className="text-start mt-5">
          <button
            className="btn btn-success"
            type="submit"
            onClick={handleClick}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}

export default Logout;
