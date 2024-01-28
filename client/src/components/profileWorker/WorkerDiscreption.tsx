import { useContext } from "react";
import { globalComponents } from "./WorkerProfil";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdatePhone from "../boxUpdate/updatePhone";
import UpdateDiscreption from "../boxUpdate/updateDiscreption";
import UpdateWorkName from "../boxUpdate/updateWorkName";
import UpdateStateAndDelegation from "../boxUpdate/updateStateAndDelegation";

const WorkerDiscreption = () => {

  const { WorkerInformations , isMe } = useContext(globalComponents);
  const { discreption, phone, state, delegation, workName } = WorkerInformations;


  return (
    <div
      id="workerData"
      className="pt-3 text-end "
      style={{ backgroundColor: "#rgb(255 224 217 / 28%)" }}
    >
       <div id="cartDiscreption" className="m-1 p-2"  >
        <div className="  p-8 " >
          <div className={isMe ? "d-flex justify-content-between" : ""}>
           {isMe && <UpdateWorkName currentWorkName={workName} />}

            <p className="fw-bold">{workName}</p>
          </div>
          <div className={isMe ? "d-flex justify-content-start" : ""}>
            {isMe && <UpdateDiscreption discreption={discreption} />}
             <p className="text-break text-center w-100"  style={{whiteSpace: "pre-line"}}>{discreption}</p>
           </div>
        </div>
      </div>
      
      <div className="m-1" id="cartId" >
        <div className={isMe ? "d-flex justify-content-between" : ""}>
        {isMe && <UpdatePhone phone={phone} />}
          <p>
            {phone}
            <span className="fw-bold">
              {" "}
              : <FontAwesomeIcon icon={faPhone} />{" "}
            </span>
          </p>
        </div>
        <div className={isMe ? "d-flex justify-content-between" : ""}>
        {isMe && <UpdateStateAndDelegation currentState={state}  currnetDelegation={delegation}/>}

          <p>
            <span className="fw-bold">ولاية : </span>
            {state}
          </p>
        </div>
        <div className={isMe ? "d-flex justify-content-between" : ""}>
        {isMe && <UpdateStateAndDelegation currentState={state}  currnetDelegation={delegation}/>}
          <p>
            <span className="fw-bold">مدينة :</span>
            {delegation}
          </p>
        </div>
      </div>

    </div>
  );
};

export default WorkerDiscreption;
