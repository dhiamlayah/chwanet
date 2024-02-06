 
import { Link } from "react-router-dom";
import ClientProfil from "../ClientProfil";
import { User } from "../../App";

interface Props {
    user: User|null;
  }

const NavbarForBigScreen = ({user}:Props) => {
     return (
        <div className="collapse navbar-collapse " id="navbarScroll">
        <ul
          className="navbar-nav me-auto my-2  my-lg-0 navbar-nav-scroll"
          id="navbarList"
        >
          <li className="nav-item ">
            <Link
              to="/searchWorker?filter=null&page=1"
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
          {user && user.isAdmin &&
             <li className="nav-item ">
             <Link
               to="/admin"
               id="link"
               className="text-decoration-none   nav-link"
             >
                مساحة المشرف
              </Link>
           </li>
          }
        </ul>
        
        { location.pathname !== "/register" &&
          location.pathname !== "/register/info" &&
          location.pathname !== "/login" &&
          !user && (
            <>
            <Link
              to="/register"
              className="btn btn-outline-light mx-2"
              state={{ hover: "red" }}
            >
              حساب جديد
            </Link>
            <Link to="/login" className=" btn btn-outline-light">
              دخول
            </Link>
            </>
          )}
      

        {user &&   <ClientProfil user={user}/>  }
      
      </div>
      );
}
 
export default NavbarForBigScreen;