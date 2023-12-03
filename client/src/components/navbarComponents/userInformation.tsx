import { faLocationDot, faPhone, faRightFromBracket, faTreeCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../App";
import { Link } from "react-router-dom";
interface Props {
  user: User | null;
}



const UserInformations = ({user}:Props) => {
    const logout =()=>{
        localStorage.clear()
        window.location.pathname = "/"
    
    }

  if(user)  return (
        <>
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
        {user.possition==="worker"&& 
             <li className="text-center py-2">
                <Link to="/me" className="btn btn-outline-warning  w-50">
             قم بزيارة ملفك الشخصي        
                </Link>    
            </li>
            }
        <li className="p-2 pt-4">
            <button onClick={logout} className="btn btn-danger">خروج <FontAwesomeIcon icon={faRightFromBracket} /></button>
        </li>
        </>
      );
      return null
}
 
export default UserInformations;