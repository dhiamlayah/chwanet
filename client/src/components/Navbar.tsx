import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../StyleDesign/navbar.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ClientProfil from "./ClientProfil";
const NavBar = ({ user }: any) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const navbarDesign = () => {
    if (
      location.pathname === "/register" ||
      location.pathname === "/register/info"
    ) {
      return "specialNav";
    } else {
      return "";
    }
  };

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  console.log("user", user);

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-dark fixed-top"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      id={navbarDesign()}
    >
      <div className="container-fluid  ">
        <img
          src="../images/logo4.png"
          style={{ width: "7rem", height: "3rem" }}
          alt="logo"
        />
        <button
          className="navbar-toggler"
          id="phoneNavBar"
          type="button"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2  my-lg-0 navbar-nav-scroll"
            id="navbarList"
          >
            <li className="nav-item ">
              <Link
                to="/searchWorker"
                id="link"
                className="text-decoration-none px-5 nav-link"
              >
                بحث عن عامل
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/"
                id="link"
                className="text-decoration-none   nav-link"
              >
                الصفحة الرئيسية
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/"
                id="link"
                className="text-decoration-none  px-5 nav-link"
              >
                معلومات عنا
              </Link>
            </li>
          </ul>
          {location.pathname !== "/register" &&
            location.pathname !== "/register/info" &&
            location.pathname !== "/login" &&
            !user && (
              <Link
                to="/register"
                className="btn btn-outline-light mx-2"
                state={{ hover: "red" }}
              >
                حساب جديد
              </Link>
            )}
          {location.pathname !== "/register" &&
            location.pathname !== "/register/info" &&
            location.pathname !== "/login" &&
            !user && (
              <Link to="/login" className=" btn btn-outline-light">
                دخول
              </Link>
            )}

          {user && user.possition === "worker" && (
            <Link to="/me" className="btn btn-outline-light rounded-5  me-3 ">
              <FontAwesomeIcon
                icon={faUser}
                style={{ width: "25px", height: "25px" }}
              />
            </Link>
          )}
          {user && user.possition === "client" && (
            <>
             <ClientProfil user={user}/>
            </>
          )}
        </div>
      </div>
      <div className={show ? "list-group w-100 d-lg-none pt-2 " : "d-none"}>
        {location.pathname !== "/register" &&
          location.pathname !== "/login" &&
          !user && (
            <button className="btn py-3 " id="phoneNavBar" type="submit">
              <Link
                to="/register"
                className="text-white text-decoration-none fw-medium p-2"
              >
                حساب جديد
              </Link>
            </button>
          )}
        <button className="btn   py-3 " id="phoneNavBar" type="submit">
          <Link
            to="/register"
            className="text-white text-decoration-none fw-medium p-2"
            state={{ hover: "red" }}
          >
            حساب جديد
          </Link>
        </button>
        <button className="btn py-3 " id="phoneNavBar" type="submit">
          <Link
            to="/register"
            className="text-white text-decoration-none fw-medium p-2"
            state={{ hover: "red" }}
          >
            حساب جديد
          </Link>
        </button>
       {user&&  <button className="btn py-3 " id="phoneNavBar" type="submit">
          <Link
            to="/register"
            className="text-white text-decoration-none fw-medium p-2"
            state={{ hover: "red" }}
          >
            <ClientProfil user={user}/>
           </Link>
  
        </button>}
      </div>
    </nav>
  );
};

export default NavBar;
