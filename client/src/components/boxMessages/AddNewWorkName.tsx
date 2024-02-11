import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Props = {
  open: boolean;
  setOpen: any;
  setUpdateTable:any
};

const AddNewWorkName = ({ open, setOpen ,setUpdateTable}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState<boolean>(false);
  const [newWork,setNewWork]=useState<string>("")
  const url = process.env.REACT_APP_port;

  const sendNewWorkToServer = async () => {
    await axios.post(url + "/workNameList",{name:newWork.trim()},{
        headers: {
          token: localStorage.getItem("Token"),
        },
      }).then(()=>{
        setError(null)
        setSuccess("تم العمل بنجاح");
        setUpdateTable((prev:boolean)=>!prev)
        setTimeout(() => {
            handleClose();
            setWait(false);
          }, 1500);
      }).catch((error)=>{
        setWait(false)
        setSuccess(null)
        if(error.respone){
            setError(error.respone.data.message)
        }else{
            setError("لا يمكن الاتصال بالسرفر");
        }
      })
  };

  const sendNewWork = ()=>{
    if(newWork.trim()===""){
      return  setError("الرجاء إضافة اسم جديد ")
    }
    setWait(true)
    sendNewWorkToServer()

  }

  const handleClose = () => {
    setOpen(false);
    setSuccess(null)
    setError(null)
    setNewWork("")
  };

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>أضف عمل </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-break  text-end">
          <div>
            <div className="input-group flex-nowrap py-4 ">
              <input
                type="text"
                className="form-control text-end"
                placeholder="عمل جديد"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={newWork}
                onChange={(e)=>setNewWork(e.target.value)}
              />
              <span className="input-group-text bg-secondary" id="addon-wrapping">
              اضف اسما
              </span>
            </div>
          </div>
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
        <Modal.Footer className="justify-content-start" >
          <Button className="btn btn-info" onClick={sendNewWork}>
            {!wait ? (
              "أضف"
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
};

export default AddNewWorkName;
