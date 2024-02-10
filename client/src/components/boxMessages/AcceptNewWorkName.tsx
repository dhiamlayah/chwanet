import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChooseDomain from "../ChooseDomain";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  open: boolean;
  setOpen: any;
  workerWhoAddNewName: null | { newWorkName: string; _id: string };
  setWorkerWhoAddNewName: any;
  setUpdateTable: any;
};

function AcceptNewWorkName({
  open,
  setOpen,
  workerWhoAddNewName,
  setWorkerWhoAddNewName,
  setUpdateTable,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updateWorkName, setUpdateWorkName] = useState<string>("");
  const url = process.env.REACT_APP_port;
  const [wait, setWait] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setUpdateWorkName(e.target.value);
  };
  const handleClose = () => {
    setUpdateWorkName("");
    setWorkerWhoAddNewName(null);
    setOpen(false);
  };

  const changeWorkerHisWorkName = async () => {
    try {
      await axios
        .put(
          url + `/Admin/${workerWhoAddNewName?._id}`,
          {
            NewWorkName: updateWorkName,
          },
          {
            headers: {
              token: localStorage.getItem("Token"),
            },
          }
        )
        .then(() => {
          setError(null);
          setSuccess("تم العمل بنجاح");
          setWait(false);
          setUpdateTable((prev: boolean) => !prev);
          setTimeout(() => {
            handleClose();
            setSuccess(null);
            setWait(false);
          }, 1500);
        });
    } catch (error: any) {
      setWait(false);
      setSuccess(null);  
      setError("لا يمكن الاتصال بالسرفر");
      }
  };

  const sendUpdate = () => {
    if (updateWorkName === "") {
      return setError("اختر نوع العمل");
    }
    setWait(true);
    changeWorkerHisWorkName();
  };

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>أضف اسم عمل جديد</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-break  bg-secondary text-end">
          <div className="text-end">
            <p className="text-light ">: العمل المطلوب </p>

            <p className="pe-3  text-light fw-bold">
              {workerWhoAddNewName?.newWorkName}
            </p>
          </div>
          <div className="  pt-3">
            <ChooseDomain
              handleChange={handleChange}
              workName={updateWorkName}
            />
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
        <Modal.Footer className="justify-content-start">
          <Button className="btn btn-success" onClick={sendUpdate}>
            {!wait ? (
              "حفظ"
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

export default AcceptNewWorkName;
