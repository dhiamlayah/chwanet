import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../StyleDesign/navbar.css";
import { useState } from "react";
 const NavBar = ({ user }: any) => {
  const location = useLocation();
  const [show,setShow]=useState(false)
  const navbarDesign = () => {
    if (location.pathname === "/register") {
      return "specialNav";
    } else {
      return "";
    }
  };

  const handleClick = ()=>{
      setShow((prev)=>!prev)
  }


  return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-dark fixed-top"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      id={navbarDesign()}
    >
      <div className="container-fluid  ">
          <img src="./images/logo4.png" style={{width:'7rem', height:'3rem'}} alt="logo" />
        <button
          className="navbar-toggler"
          id="phoneNavBar"
          type="button"
          onClick={handleClick}
         >
          <span className="navbar-toggler-icon"></span>
        </button>
     


        <div className="collapse navbar-collapse " id="navbarScroll">
          <ul className="navbar-nav me-auto my-2  my-lg-0 navbar-nav-scroll" id="navbarList">
        
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
            <button className="btn btn-light me-5 " type="submit">
              <Link
                to="/me"
                className="text-dark text-decoration-none fw-medium"
              >
                welcom {user.firstName}
              </Link>
            </button>
          )}
        </div>
        
      </div>
      <div className={show ? "list-group w-100 d-lg-none pt-2 " : "d-none"}>
       {location.pathname !== "/register"&& location.pathname !== "/login"  && !user && (
            <button className="btn py-3 "  id="phoneNavBar" type="submit">
              <Link
                to="/register"
                className="text-white text-decoration-none fw-medium p-2"
                state={{hover:'red'}}
               >
                حساب جديد
              </Link>
            </button>
          )}
           <button className="btn   py-3 " id="phoneNavBar" type="submit">
              <Link
                to="/register"
                className="text-white text-decoration-none fw-medium p-2"
                state={{hover:'red'}}
               >
                حساب جديد
              </Link>
            </button>
            <button className="btn py-3 "  id="phoneNavBar" type="submit">
              <Link
                to="/register"
                className="text-white text-decoration-none fw-medium p-2"
                state={{hover:'red'}}
               >
                حساب جديد
              </Link>
            </button>
            <button className="btn py-3 "  id="phoneNavBar" type="submit">
              <Link
                to="/register"
                className="text-white text-decoration-none fw-medium p-2"
                state={{hover:'red'}}
               >
                حساب جديد
              </Link>
            </button>
        </div> 
    </nav>
  );
};

export default NavBar;
