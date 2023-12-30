import axios from "axios";
import { useContext, useState } from "react";
import { globalComponents } from "./profileWorker/WorkerProfil";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SendComments = () => {
  const { WorkerInformations } = useContext(globalComponents);
  const url: string = process.env.REACT_APP_port + `/commentWorker`;
  const token = localStorage.getItem("Token");
  const [comment, setComments] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  console.log("WorkerInformations._id", WorkerInformations._id);
  const sendTheComment = async () => {
    await axios
      .put(
        url,
        { workerId: WorkerInformations._id, Comment: comment },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res: any) => {
        setError(null);
        setSuccess(res.data);
        setComments(null);
        redirectUser();
      })
      .catch((err: any) => {
        console.log("we cant rate worker", err);
      });
  };

  const redirectUser = () => {
    return setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleClick = () => {
    if (comment === null || comment === null) return null;
    if (!token) {
      return setError(
        " يؤسفنا إبلاغك بأنه يجب أن يكون لديك حساب قبل أن تقوم بتقييم العامل "
      );
    }
    sendTheComment();
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert  bg-success text-white" role="alert">
          <FontAwesomeIcon icon={faCheck} className="px-5" />
          {success}
        </div>
      )}
      <div className="input-group text-end ">
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={handleClick}
        >
          إرسال
        </button>
        <input
          type="text"
          className=" border border-dark form-control "
          placeholder="اكتب تعليقك"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={comment ? comment : ""}
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SendComments;
