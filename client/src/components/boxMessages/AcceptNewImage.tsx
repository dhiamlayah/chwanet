import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import axios from "axios";

const AcceptNewImag = ({open,setOpen,setUserPhoto,imgPDPUrl,setUserFile,userFile,path}:any) => {
  const url = process.env.REACT_APP_port;
  const {setUpdate}= useContext(globalComponents)
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false)
    setWait(false)
    setError(null)
    setUserFile(null)
    setUserPhoto(imgPDPUrl)
  };

  const sendPictureToServer = async () => {
    const formData = new FormData();
    formData.append("file", userFile);
    try {
      await axios
        .put(url + "/meAsWorker/"+path, formData, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then(() => {
          setWait(false);
          setSuccess("تم تغيير الصورة بنجاح ");
          setUpdate((prev:boolean)=>!prev)
          setTimeout(() => {
            setOpen(false)
            setUserFile(null)         
            setSuccess(null);
            setWait(false);
          }, 1500);
         });
    } catch (error: any) {
        setSuccess(null)
        setWait(false)
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("لا يمكن الاتصال بالسرفر، من فضلك أعد مرة أخرى ");
      }
    }
  };


  return (
    <>
      <Modal show={open} onHide={handleClose}>
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
        <Modal.Footer className="justify-content-between">
          <div>
            <Button className="btn btn-success mx-3" onClick={()=>{
                setWait(true)
                sendPictureToServer()
            }}>
              {!wait ? (
                "نعم"
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
          </div>
          <Modal.Title> ? تغيير الصورة</Modal.Title>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AcceptNewImag;
