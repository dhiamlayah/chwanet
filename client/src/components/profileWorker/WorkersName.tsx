import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkerName = ({ handleUpdate, firstName, lastName, isMe }: any) => {
  const user = localStorage.getItem("User");
  const RateWorker = () => {};
  return (
    <div
      id="workerName"
      className="d-flex "
      style={{ justifyContent: "space-between" }}
    >
      <div>
        {isMe && (
          <h1
            className="px-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdate("name", [firstName, lastName])}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </h1>
        )}
        <h1 className="fw-bold ">
          {firstName} {lastName}
        </h1>
      </div>

      <div>
        <div className="d-flex" id="rate">
          <div>
            <h1>4.5/5</h1>
            <p className="">500 people</p>
          </div>
          <img
            src="../../images/rateStars/0.5.png"
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
            قدم له تقييم
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkerName;
