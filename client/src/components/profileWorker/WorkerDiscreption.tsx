import { useContext, useState } from "react";
import { globalComponents } from "./WorkerProfil";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdatePhone from "../boxUpdate/updatePhone";
import UpdateDiscreption from "../boxUpdate/updateDiscreption";
import UpdateWorkName from "../boxUpdate/updateWorkName";
import UpdateStateAndDelegation from "../boxUpdate/updateStateAndDelegation";

const WorkerDiscreption = () => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  const { WorkerInformations , isMe } = useContext(globalComponents);
  const { discreption, phone, state, delegation, workName } = WorkerInformations;
  
  let writeRight="text-start"
  if(arabicRegex.test(discreption.trim())){
      writeRight ="text-end"
  }

  return (
    <div
      id="workerData"
      className="pt-3 text-end "
      style={{ backgroundColor: "#rgb(255 224 217 / 28%)",minHeight:"30vh" }}
    >
       <div id="cartDiscreption" className="m-1 p-2"  >
        <div className="  p-8 " >
         {workName!=="أخرى (أريد إضافة عملي)" && <div className={isMe ? "d-flex justify-content-between" : ""}>
           {isMe && <UpdateWorkName currentWorkName={workName} />}

            <p className="fw-bold">{workName}</p>
          </div>}
          {workName==="أخرى (أريد إضافة عملي)" && <p className="fw-bold text-center text-danger">
          لم تتم إضافة اسم عملك حتى الآن من قبل المسؤول ولكن لا تقلق، سنقوم بإضافته قريبًا ليكون مرئيًا

            </p>}
          <div className={isMe ? "d-flex justify-content-start" : ""}>
            {isMe && <UpdateDiscreption discreption={discreption} />}
             <p className={`text-break ${writeRight} w-100`}  style={{whiteSpace: "pre-line",minHeight:"12vh"}}>{discreption}</p>
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
