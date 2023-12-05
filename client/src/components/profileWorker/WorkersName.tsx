import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkerName = ({handleUpdate,firstName,lastName,isMe}:any) => {
    return (  
        <div id="workerName" className="d-flex">
            {isMe && (
              <h1
                className="px-2"
                style={{cursor:"pointer"}}
                onClick={() => handleUpdate("name", [firstName, lastName])}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> 
              </h1>
            )}
            <h1 className="fw-bold ">
               { firstName} {lastName}
            </h1>
          </div> 
    );
}
 
export default WorkerName;