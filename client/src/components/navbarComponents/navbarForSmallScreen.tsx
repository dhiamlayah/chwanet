import { Link } from "react-router-dom";
import UserInformations from "./userInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../App";
 
interface Props {
    user :User |null ,
    show:boolean,
    showProfile:boolean,
    setShow:Function, 
    setShowProfile:Function,

}
const NavBarForSmallScreen = ({ user, show, setShow,setShowProfile,showProfile }: Props) => {

  return (
    <div className={show ? "list-group w-100 d-lg-none pt-2 " : "d-none"}>
      <div
        className={showProfile ? "d-none" : "list-group w-100 d-lg-none pt-2 "}
      >
        {location.pathname !== "/register" &&
          location.pathname !== "/login" &&
          !user && (
            <>
              <Link
                to="/login"
                className="btn py-3 text-white text-decoration-none fw-medium p-2"
                id="phoneNavBar"
                onClick={() => setShow(false)}
              >
                دخول
              </Link>
              <Link
                to="/register"
                className="btn py-3 text-white text-decoration-none fw-medium p-2"
                id="phoneNavBar"
                onClick={() => setShow(false)}
              >
                حساب جديد
              </Link>
            </>
          )}

        <Link
          to="/"
          className=" btn py-3 text-white text-decoration-none fw-medium p-2"
          id="phoneNavBar"
          onClick={() => setShow(false)}
        >
          الصفحة الرئيسية
        </Link>

        <Link
          to="/register"
          className="btn py-3 text-white text-decoration-none fw-medium p-2"
          id="phoneNavBar"
          onClick={() => setShow(false)}
        >
          معلومات عنا
        </Link>

        <Link
          to="/searchWorker"
          className="btn py-3 text-white text-decoration-none fw-medium p-2"
          id="phoneNavBar"
          onClick={() => setShow(false)}
        >
          بحث عن عامل
        </Link>

        {user && (
          <button
            className="btn py-3 text-white text-decoration-none fw-medium p-2"
            id="phoneNavBar"
            onClick={() => {
              setShowProfile(true);
            }}
          >
            الملف الشخصي
          </button>
        )}
      </div>

      <div
        className={showProfile ? "list-group w-100 d-lg-none pt-2 " : "d-none"}
      >
        <ul className="text-white list-group  " style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
          <div
            className="p-2"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfile(false)}
          >
            <FontAwesomeIcon icon={faLeftLong} />
          </div>
             <UserInformations user={user} />
         </ul>
      </div>
    </div>
  );
};

export default NavBarForSmallScreen;
