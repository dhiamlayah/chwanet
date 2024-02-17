import axios from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { globalComponents } from "./profileWorker/WorkerProfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type Props = {
  setAddNewComment: React.Dispatch<React.SetStateAction<boolean>>
}

const SendComments = ({setAddNewComment}:Props) => {
  const { WorkerInformations } = useContext(globalComponents);
  const url: string = process.env.REACT_APP_port + `/commentWorker`;
  const token = localStorage.getItem("Token");
  const [comment, setComments] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const sendTheComment = async () => {
    await axios
      .put(
        url,
        { workerId: WorkerInformations._id, Comment: comment?.trim() },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(() => {
        setError(null);
        setSuccess('تم إرسال التعليق بنجاح');
        setComments(null);
        setAddNewComment((prev:boolean)=>{return !prev})
        setTimeout(()=>{
          setSuccess(null);
        },2500)
      })
      .catch((error: any) => {
        if(error.response){
          setError(error.response.data.message)
        }else{
          setError('لا يمكن الاتصال بالسرفر')
        }      
       });
  };
 

  const handleClick = () => {
    if (comment === null || comment.trim() === "") return null;
    if (!token) {
      return setError(
        " يؤسفنا إبلاغك بأنه يجب أن يكون لديك حساب قبل أن تقوم بتقييم العامل "
      );
    }
    sendTheComment();
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}
      {!token && <Link   to={`/register?redirectPath=${window.location.pathname}`} className="px-2">تسجيل الدخول</Link>}
      </div>}
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
        <textarea
          rows={1}
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
