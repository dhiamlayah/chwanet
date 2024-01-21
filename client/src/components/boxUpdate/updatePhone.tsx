import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { sendUpdate } from "../../methods/updateData";

type Props = {
  phone: string;
};

const UpdateNames = ({ phone }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState({
     phone: phone,
  });
  const handleChange = (type: string, e: any) => {
    setNewName((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };

  const checkUpdate = () => {
    if (newName.phone === "") {
      return setError("complete names");
    } else sendUpdate(newName, "name", setError);
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تحديث الأسماء </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="  text-center ">
            <h2 className="text-end px-3 p-2"> : phone </h2>
            <input
              type="text"
              className="w-50 fw-bold text-center my-2 "
              style={{ height: "50px", fontSize: "20px" }}
              value={newName.phone}
              onChange={(e) => handleChange("phone", e)}
            />
          </div>

          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="success" onClick={() => checkUpdate()}>
            حفظ
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            غلق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateNames;
