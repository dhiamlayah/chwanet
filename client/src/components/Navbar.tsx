import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const NavBar = () => {
  const location = useLocation();
   return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-dark fixed-top"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="container-fluid ">
        <a className="navbar-brand" href="#">
          LOGO
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse  " id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Link
                to="/"
                className="text-decoration-none text-white nav-link "
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link  text-white" href="#">
                Link
              </a>
            </li>
          </ul>
          {location.pathname !== "/register" && (
            <form className="d-flex" role="search">
              <button className="btn btn-primary me-5" type="submit">
                <Link
                  to="/register"
                  className="text-light text-decoration-none fw-medium"
                >
                  تسجيل الدخول
                </Link>
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
