import "../css/sidebar.css";
import { Nav, NavDropdown } from "react-bootstrap";

function NavigationTemplate() {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3 logo-panerai" href="index.html">
        PANERAI
      </a>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <Nav>
        <NavDropdown title="COLLECTIONS" id="basic-nav-dropdown">
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <NavDropdown.Item>
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-fw"></i>
                </a>
              </NavDropdown.Item>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <NavDropdown.Item>
                  <li>
                    <a className="dropdown-item" href="/">
                      Settings
                    </a>
                  </li>
                </NavDropdown.Item>
                <li>
                  <a className="dropdown-item" href="/">
                    Activity Log
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </NavDropdown>
      </Nav>
    </nav>
  );
}

export default NavigationTemplate;
