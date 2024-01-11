import { useContext } from "react";
import { globalComponents } from "./WorkerProfil";
import { faPenToSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkerDiscreption = () => {

  const { WorkerInformations ,  handleUpdate  , isMe } = useContext(globalComponents);
  const { discreption, phone, state, delegation, workName } = WorkerInformations;


  return (
    <div
      id="workerData"
      className="pt-3 text-end "
      style={{ backgroundColor: "#rgb(255 224 217 / 28%)" }}
    >
       <div id="photo" className="m-1 p-2" style={{boxShadow:' 5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
        <div className="  p-8 " >
          <div className={isMe ? "d-flex justify-content-between" : ""}>
            {isMe && (
              <p
                className="p-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleUpdate("workName", [workName])}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </p>
            )}
            <p className="fw-bold">{workName}</p>
          </div>
          <div className={isMe ? "d-flex justify-content-between" : ""}>
            {isMe && (
              <p
                className="p-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleUpdate("discreption", [discreption])}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </p>
            )}
            <p className="text-break text-center">{discreption}</p>
          </div>
        </div>
      </div>
      <div className="  m-1 " id="cartId" style={{boxShadow:' 5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
        <div className={isMe ? "d-flex justify-content-between" : ""}>
          {isMe && (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleUpdate("phone", [phone])}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </p>
          )}
          <p>
            {phone}
            <span className="fw-bold">
              {" "}
              : <FontAwesomeIcon icon={faPhone} />{" "}
            </span>
          </p>
        </div>
        <div className={isMe ? "d-flex justify-content-between" : ""}>
          {isMe && (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleUpdate("state", [state])}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </p>
          )}
          <p>
            <span className="fw-bold">ولاية : </span>
            {state}
          </p>
        </div>
        <div className={isMe ? "d-flex justify-content-between" : ""}>
          {isMe && (
            <p style={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={() => handleUpdate("state", [state])}
              />
            </p>
          )}
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
