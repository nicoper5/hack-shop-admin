import "../css/sidebar.css";
import { NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearToken } from "../redux/adminSlice";

function NavigationTemplate() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearToken());
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-black">
      <a className="navbar-brand ps-3 logo-panerai" href="/">
        PANERAI
      </a>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
      <NavDropdown
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="15px"
            id="nav-profile"
            fill="white"
          >
            <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
          </svg>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>
          <button
            className="btn btn-danger "
            type="submit"
            onClick={handleClick}
          >
            Logout
          </button>
        </NavDropdown.Item>
      </NavDropdown>
    </nav>
  );
}

export default NavigationTemplate;
