import { useState, useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { sendUpdate } from "../../methods/updateData";

type Props = {
    discreption: string;
};

const UpdateDiscreption = ({ discreption }: Props) => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const [writeRight,setWriteRight]=useState<string>("text-start")
  const { setUpdate } = useContext(globalComponents);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState(false);
  const [newDiscreption, setNewDiscreption] = useState({
    discreption: discreption,
  });

  const closeBoxShow =()=>{
    setError(null)
    setSuccess(null)
    setShow(false)
  }

  const checkUpdate = async () => {
    const disc = newDiscreption.discreption.trim() 
    if ( disc === "" ){
      return setError("discreption vide");
     } else {
      setWait(true);
      const messageRecive = await sendUpdate( {discreption:disc}, setError);
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
        <Modal.Body>
            <div className=" text-center ">
            <h2 className="text-end    "> : صف حياتك المهنية </h2>
            <p className="text-end  ">
            تذكر أن رقمك مطلوب لتسجيل الدخول وتأكد من أنه يعمل لسهولة اتصال العميل
            بك
            </p>
            <textarea
            className={`fw-bold ${writeRight}   w-100 `}
            style={{ height: "150px",  }}
            value={newDiscreption.discreption}
            onChange={(e) => {
              setNewDiscreption({discreption:e.target.value})
              if(arabicRegex.test(e.target.value.trim())){
                setWriteRight("text-end")
                }else{
                  setWriteRight("text-start")
                }
            }}
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

export default UpdateDiscreption;
