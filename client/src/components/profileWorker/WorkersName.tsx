import { useContext } from "react";
import { globalComponents } from "./WorkerProfil";
import { faClipboard, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateNames from "../boxUpdate/updateNames";

const WorkerName = () => {
  const user = localStorage.getItem("User");

  const { WorkerInformations, handleUpdate, isMe, WorkerRate } =
    useContext(globalComponents);
  const { firstName, lastName } = WorkerInformations;
  console.log("worker rate .........>", WorkerRate);
  const starImag = () => {
    const imagUrl = "../../images/rateStars/";
    if (WorkerRate.rate < 1.25) {
      return imagUrl + "0.png";
    } else if (WorkerRate.rate >= 1.25 && WorkerRate.rate < 2.5) {
      return imagUrl + "0.25.png";
    } else if (WorkerRate.rate >= 2.5 && WorkerRate.rate < 3.75) {
      return imagUrl + "0.5.png";
    } else if (WorkerRate.rate >= 3.75 && WorkerRate.rate < 5) {
      return imagUrl + "0.75.png";
    } else {
      return imagUrl + "1.png";
    }
  };

  return (
    <div
      id="workerName"
      className="d-flex "
      style={{ justifyContent: "space-between" }}
    >
      <div>
        {isMe && <UpdateNames firstName={firstName} lastName={lastName} />}
        <h1 className="fw-bold ">
          {firstName} {lastName}
        </h1>
      </div>

      <div>
        <div className="d-flex" id="rate">
          <div>
            <h1 className="text-end">{WorkerRate.rate | 0}/5</h1>
            <div className="d-flex">
              <p className="px-1" style={{ width: "max-content" }}>
                {" "}
                شخص مقييم للأداء{" "}
              </p>
              <p> {WorkerRate.length}</p>
            </div>
          </div>
          <img
            src={starImag()}
            className="mx-3 mt-2"
            style={{ width: "48px", height: "48px" }}
            alt="star"
          />
        </div>
        {user !== "Worker" && (
          <p
            id="giveRate"
            onClick={() => handleUpdate("rateWorker", [])}
            className="text-end pe-5 fs-5"
          >
            <FontAwesomeIcon icon={faClipboard} /> قدم له تقييم
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkerName;
