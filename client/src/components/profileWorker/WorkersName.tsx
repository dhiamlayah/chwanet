import {
  faClipboard,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkerName = ({
  handleUpdate,
  firstName,
  lastName,
  isMe,
  userRate,
}: any) => {
  const user = localStorage.getItem("User");

  const starImag = () => {
    const imagUrl = "../../images/rateStars/";
    if (userRate.rate < 1.25) {
      return imagUrl + "0.png";
    } else if (userRate.rate >= 1.25 && userRate.rate < 2.5) {
      return imagUrl + "0.25.png";
    } else if (userRate.rate >= 2.5 && userRate.rate < 3.75) {
      return imagUrl + "0.5.png";
    } else if (userRate.rate >= 3.75 && userRate.rate < 5) {
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
            <h1 className="text-end">{userRate.rate | 0 }/5</h1>
            <div className="d-flex">
              <p className="px-1" style={{width:'max-content'}}> شخص مقييم للأداء </p>
              <p> {userRate.length}</p>
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
