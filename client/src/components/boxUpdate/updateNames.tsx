import { useState, useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { sendUpdate } from "../../methods/updateData";

type Props = {
  firstName: string;
  lastName: string;
};

const UpdateNames = ({ firstName, lastName }: Props) => {
  // when we update somthing refresh the profile with new data
  const { setUpdate } = useContext(globalComponents);

  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState(false);

  const [newName, setNewName] = useState({
    firstName: firstName,
    lastName: lastName,
  });


  const handleChange = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewName((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };

  const closeBoxShow =()=>{
    setError(null)
    setSuccess(null)
    setShow(false)
  }

  const checkUpdate = async () => {
    if (newName.firstName === "" || newName.lastName === "") {
      return setError("complete names");
    } else {
      setWait(true)
      const messageRecive = await sendUpdate(newName, "name", setError);
      if (!messageRecive) {
        return setWait(false);
      } else {
        setError(null)
        setSuccess("تم تحديث البيانات بنجاح");
        setUpdate((prev: boolean) => {
          return !prev;
        });
        setTimeout(() => {
          setShow(false);
          setError(null);
          setSuccess(null);
          setWait(false)
        }, 2000);
      }
    }
  };

  return (
    <div>
      <h3
        className="px-2"
        style={{ cursor: "pointer" }}
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </h3>
      <Modal show={show} onHide={closeBoxShow}>
        <Modal.Header closeButton>
          <Modal.Title>تحديث الأسماء </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="  text-center ">
            <h2 className="text-end px-3 p-2"> : الاسم </h2>
            <input
              type="text"
              className=" fw-bold text-center my-2 "
              style={{ height: "50px", fontSize: "20px" }}
              value={newName.firstName}
              onChange={(e) => handleChange("firstName", e)}
            />
            <br />
            <h2 className="text-end px-3"> : اللقب</h2>
            <input
              type="text"
              className="fw-bold text-center my-2 "
              style={{ height: "50px", fontSize: "20px" }}
              value={newName.lastName}
              onChange={(e) => handleChange("lastName", e)}
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

export default UpdateNames;
