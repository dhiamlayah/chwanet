import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  open: boolean;
  setOpen: any;
  workerId: undefined | string;
  setUpdateComments:any
};

function DeleteComment({
  open,
  setOpen,
  workerId,
  setUpdateComments,
}: Props) {
  const url = process.env.REACT_APP_port;
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait,setWait]=useState<boolean>(false)

  const handleClose = () => {
    setOpen(false);
  };

  const sendToDeleteFromServer = async () => {
    await axios.delete(url + `/commentWorker/${workerId}`, {
      headers: {
        token: localStorage.getItem("Token"),
      },
    }).then(()=>{
      setError(null)
      setUpdateComments((prev:boolean)=>!prev)
      setSuccess("تم الحذف بنجاح ")
      setTimeout(() => {
        handleClose();
        setSuccess(null);
        setWait(false);
      }, 1500);
    }).catch((error)=>{
      setSuccess(null)
      setWait(false)
      if(error.response){
        setError(error.response.data.message);
      }else{
        setError("لا يمكن الاتصال بالسرفر");
      }
    })
  };
  const deleteWorker = () => {
    setWait(true)
    sendToDeleteFromServer();
  };
  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>حذف التعليق </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-break  text-end">
          <h3 className="text-secondary py-5">
            هل أنت متأكد أنك تريد حذف هذا التعليق!
          </h3>
        </Modal.Body>
        {success && (
          <div className="alert alert-success mt-2">
            {" "}
            <FontAwesomeIcon icon={faCheck} className="px-2" />
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-2">
            <FontAwesomeIcon icon={faXmark} className="px-2" />
            {error}
          </div>
        )}
        <Modal.Footer className="justify-content-start">
          <Button className="btn btn-danger" onClick={deleteWorker}>
            {!wait ? (
              "حذف"
            ) : (
              <>
                <span role="status">انتظر...</span>
                <span
                  className="spinner-grow spinner-grow-sm"
                  aria-hidden="true"
                ></span>
              </>
            )}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteComment;
