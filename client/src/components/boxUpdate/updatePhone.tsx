import { useState, useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { sendUpdate } from "../../methods/updateData";

type Props = {
  phone: string;
};

const UpdatePhone = ({ phone }: Props) => {
  const { setUpdate } = useContext(globalComponents);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState(false);
  const [newPhone, setNewPhone] = useState({
    phone: phone,
  });

  const closeBoxShow =()=>{
    setError(null)
    setSuccess(null)
    setShow(false)
  }

  const checkUpdate = async () => {
    const number = Number(newPhone.phone);
    if (!number) {
      return setError("رقم الهاتف خاطئ");
    }
    if (newPhone.phone.trim() === "" ){
      return setError("رقم الهاتف");
     } else {
      setWait(true);
      const messageRecive = await sendUpdate( newPhone, setError);
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
      <Modal show={show} onHide={closeBoxShow}>
        <Modal.Header closeButton>
          <Modal.Title>تحديث الهاتف </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" text-center ">
            <h2 className="text-end px-3 p-2"> : الهاتف </h2>
            <p className="text-end px-3">
              تذكر أن رقمك مطلوب لتسجيل الدخول وتأكد من أنه يعمل لسهولة اتصال
              العميل بك
            </p>
            <input
              type="text"
              className="w-50 fw-bold text-center my-2 "
              style={{ height: "50px", fontSize: "20px" }}
              value={newPhone.phone}
              onChange={(e) => setNewPhone({ phone: e.target.value })}
            />
            <br />
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

export default UpdatePhone;
