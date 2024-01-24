import { useState, useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { sendUpdate } from "../../methods/updateData";
import ChooseStateAndDelegation from "../ChooseStateAndDelegation";

type Props = {
    currentState: string,
    currnetDelegation: string;

};

const UpdateStateAndDelegation = ({ currentState,currnetDelegation }: Props) => {
  const { setUpdate } = useContext(globalComponents);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState(false);
  const [newState, setNewState] = useState<string>(currentState)
  const [newDelegation, setNewDelegation] = useState<string>(currnetDelegation)

 

 
  const closeBoxShow = () => {
    setError(null);
    setSuccess(null);
    setShow(false);
  };

  const checkUpdate = async () => {
     if (!newState || !newDelegation) {
      return setError("wrang state and delegation ");
    }
     else {
      setWait(true);
      const messageRecive = await sendUpdate(
        { state: newState, delegation:newDelegation },
        setError
      );
      if (!messageRecive) {
        return setWait(false);
      } else {
        setError(null);
        setSuccess("تم تحديث البيانات بنجاح");
        setUpdate((prev: boolean) => {
          return !prev;
        });
        setTimeout(() => {
          setShow(false);
          setError(null);
          setSuccess(null);
          setWait(false);
        }, 2000);
      }
    }
  };

  return (
    <div>
      <p
        className="px-2"
        style={{ cursor: "pointer" }}
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </p>
      <Modal show={show} onHide={closeBoxShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>تحديث الهاتف </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary ">
          <div
            className="text-light text-center  py-5 w-75 "
            style={{ fontSize: "20px" }}
          >
            <ChooseStateAndDelegation
              state={newState}
              userDelegation={newDelegation}
              setUserDelegation={setNewDelegation}
              setState={setNewState}
            />
          </div>
          {success && <div className="alert alert-success mt-2">{success}</div>}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="success" onClick={() => checkUpdate()}>
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
          <Button variant="secondary" onClick={closeBoxShow}>
            غلق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateStateAndDelegation;
