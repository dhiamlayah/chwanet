import { useState, useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { sendUpdate } from "../../methods/updateData";
import ChooseDomain from "../ChooseDomain";

type Props = {
  currentWorkName: string;
};

const UpdateWorkName = ({ currentWorkName }: Props) => {
  const { setUpdate } = useContext(globalComponents);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState(false);
  const [newWorkName, setNewWorkName] = useState({
    workName: currentWorkName,
  });


  // name parameter not neccessery but we should put it cause the component need it 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setNewWorkName({ workName: e.target.value });
  };


  const closeBoxShow = () => {
    setError(null);
    setSuccess(null);
    setShow(false);
  };

  const checkUpdate = async () => {
    const workName = newWorkName.workName;
    if (!workName) {
      return setError("اسم العمل الخاطئ");
    }
    if (newWorkName.workName.trim() === "") {
      return setError(" ضروري اسم العمل ");
    } else {
      setWait(true);
      const messageRecive = await sendUpdate({workName:workName.trim()}, setError);
      if (!messageRecive) {
        return setWait(false);
      } else {
        setError(null);
        setSuccess("تم تحديث العمل بنجاح");
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
          <Modal.Title>تحديث العمل </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary ">
          <div
            className="text-light text-center  py-5 w-75 "
            style={{ fontSize: "20px" }}
          >
            <ChooseDomain
              workName={newWorkName.workName}
              handleChange={handleChange}
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

export default UpdateWorkName;
