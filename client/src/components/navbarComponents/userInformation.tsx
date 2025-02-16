import { faLocationDot, faPhone, faRightFromBracket, faTreeCity, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../App";
import { Link } from "react-router-dom";
interface Props {
  user: User | null;
  setShow:any
}



const UserInformations = ({user,setShow}:Props) => {
    const logout =()=>{
        localStorage.clear()
        window.location.pathname = "/"
    
    }

  if(user)  return (
        <>
          <div className="position-relative d-lg-none my-2 mb-4">
          <FontAwesomeIcon icon={faUser} style={{width:"30px",backgroundColor:"silver"}} className=" fs-1 position-absolute p-3 top-0 start-50 translate-middle rounded rounded-5  border border-white" />      
          </div>
         <div >
          <h5 className="text-center py-3">
            {user.firstName} {user.lastName}
          </h5>
        </div>
        <div className="text-end ">
          <h5 >
            {user.phone}
            <span className="px-2">
              <FontAwesomeIcon icon={faPhone} />
            </span>
          </h5>
        </div>
        <div className="text-end ">
          <h5 >
            {user.state}
             <span className="px-2">
              <FontAwesomeIcon icon={faLocationDot} />
            </span> 
          </h5>
        </div>
        <div className="text-end ">
          <h5 >
            {user.delegation}
             <span className="px-2">
             <FontAwesomeIcon icon={faTreeCity} />      
              </span> 
          </h5>
        </div>
        {user.possition==="worker"&& 
             <div className="text-center py-2">
                <Link to="/profile/me" onClick={()=>{if(setShow !== null) return setShow(false)}} className="btn btn-outline-warning  w-50">
             قم بزيارة ملفك الشخصي        
                </Link>    
            </div>
            }
        <div className="p-2 pt-4">
            <button onClick={logout} className="btn btn-danger">خروج <FontAwesomeIcon icon={faRightFromBracket} /></button>
        </div>
        </>
      );
      return null
}
 
export default UserInformations;