 
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

type Props = {
  open: boolean,
  setOpen: any,
  workerId:undefined |string
  setWorkerWhoAddNewName:any
  setUpdateTable:any
};

function DeleteWorker({ open, setOpen ,workerId,setWorkerWhoAddNewName,setUpdateTable}: Props) {
  const [updateWorkName,setUpdateWorkName]=useState<string>("")

  const handleClose = () => {
    setUpdateWorkName("")
    setWorkerWhoAddNewName(null)
    setOpen(false)};

    const sendToDeleteFromServer = async()=>{

    }
  const deleteWorker=()=>{
    sendToDeleteFromServer()
  }  
  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        
      >
        <Modal.Header>
          <Modal.Title>حذف عمل  </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-break  text-end">
            <h3 className="text-secondary py-5">هل أنت متأكد أنك تريد حذف هذا العامل!</h3>

        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button className="btn btn-danger" onClick={deleteWorker}>
          حذف   
          </Button>
          <Button variant="secondary" onClick={handleClose}>
             إلغاء 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteWorker;
