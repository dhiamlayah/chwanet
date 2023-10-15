import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../StyleDesign/navbar.css";
 const NavBar = ({ user }: any) => {
  const location = useLocation();

  const navbarDesign = () => {
    if (location.pathname === "/register") {
      return "specialNav";
    } else {
      return "";
    }
  };


  return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-dark fixed-top"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      id={navbarDesign()}
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
                الصفحة الرئيسية
              </Link>
            </li>
          
          </ul>
          {location.pathname !== "/register"&& location.pathname !== "/login"  && !user && (
            <button className="btn btn-light me-1" type="submit">
              <Link
                to="/register"
                className="text-dark text-decoration-none fw-medium p-2"
                state={{hover:'red'}}
               >
                حساب جديد
              </Link>
            </button>
          )}
          {location.pathname !== "/register" && location.pathname !== "/login" && !user && (
            <button className="btn btn-light" type="submit" >
              <Link
                to="/login"
                className="text-dark  text-decoration-none fw-medium p-2"
               >
                دخول
              </Link>
            </button>
          )}

          {user && (
            <button className="btn btn-primary me-5" type="submit">
              <Link
                to="/register"
                className="text-light text-decoration-none fw-medium"
              >
                welcom {user.firstName}
              </Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
