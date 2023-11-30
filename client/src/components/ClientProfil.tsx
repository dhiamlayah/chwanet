import {
  faLocationDot,
  faPhone,
  faRightFromBracket,
  faTreeCity,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  user: any;
}

const logout =()=>{
    localStorage.clear()
    window.location.pathname = "/"

}

function ClientProfil({ user }: Props) {
   return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light rounded-5  me-3  dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon
          icon={faUser}
          style={{ width: "25px", height: "25px" }}
        />
      </button>
      <ul
        className="dropdown-menu mt-2 p-5   "
        style={{ position: "absolute",left: "auto", right: "0px",width: "max-content" }}
      >
        <li>
          <h5 className="text-center py-2">
            {user.firstName} {user.lastName}
          </h5>
        </li>
        <li className="text-end ">
          <h5 >
            {user.phone}
            <span className="px-2">
              <FontAwesomeIcon icon={faPhone} />
            </span>
          </h5>
        </li>
        <li className="text-end ">
          <h5 >
            {user.state}
             <span className="px-2">
              <FontAwesomeIcon icon={faLocationDot} />
            </span> 
          </h5>
        </li>
        <li className="text-end ">
          <h5 >
            {user.delegation}
             <span className="px-2">
             <FontAwesomeIcon icon={faTreeCity} />      
              </span> 
          </h5>
        </li>

        <li className="pt-5 ">
            <button onClick={logout} className="btn btn-warning">خروج <FontAwesomeIcon icon={faRightFromBracket} /></button>
        </li>
      </ul>
    </div>
  );
}

export default ClientProfil;
