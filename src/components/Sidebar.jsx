import "../css/sidebar.css";

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav" className="sidebar-propio">
      <nav className="sb-sidenav sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <a className="nav-link mt-5" href="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Orders
            </a>
            <a
              className="nav-link collapsed"
              href="/admin"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Admins
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <a
              className="nav-link collapsed"
              href="/products"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="sb-nav-link-icon"></div>
              Products
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <a className="nav-link" href="/collections">
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              Collections
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
