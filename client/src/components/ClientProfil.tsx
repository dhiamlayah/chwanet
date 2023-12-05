import {  faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInformations from "./navbarComponents/userInformation";
import { User } from "../App";
interface Props {
  user: User | null;
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
        className="dropdown-menu mt-2 p-5"
        style={{ position: "absolute",left: "auto", right: "0px",width: "max-content",backgroundColor:'dimgrey' }}
      >
        {user && <UserInformations user={user}/>}
       
      </ul>
    </div>
  );
}

export default ClientProfil;
