import { useState, useContext } from "react";
import { globalComponents } from "../profileWorker/WorkerProfil";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboard, faXmark } from "@fortawesome/free-solid-svg-icons";
import StarsRating from "react-star-rate";
import axios from "axios";
import { Link } from "react-router-dom";

const GiveRate = () => {
  const { setClientGiveRate ,WorkerInformations} = useContext(globalComponents);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [wait, setWait] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const url: string = process.env.REACT_APP_port + "/rateWorker";
  const token = localStorage.getItem("Token");

  const closeBoxShow = () => {
    setError(null);
    setSuccess(null);
    setShow(false);
  };

  const sendRate = async () => {
    await axios
      .put(
        url,
        { workerId: WorkerInformations._id ,Rate:value},
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      )
      .then(() => {
        setSuccess("تم تقييم العمل بنجاح ");
        setError(null);
        setClientGiveRate((prev:boolean)=>{return !prev})
        setTimeout(() => {
            setShow(false);
            setSuccess(null)
            setWait(false);
         }, 2000);
      })
      .catch((error: any) => {
        setWait(true)
            if(error.response){
                setError(error.response.data.message)
            }else{
                setError('لا يمكن الاتصال بالسرفر')
            }   
      });
  };

  const handleClick = async () => {
    if (value === null) {
      return setError("من فظلك قم بتقييم العامل ");
    }
    if (!token) {
      return setError(
        " يؤسفنا إبلاغك بأنه يجب أن يكون لديك حساب قبل أن تقوم بتقييم العامل      "
      );
    }
    setWait(true);
    await sendRate();

  };

  return (
    <div>
      <p
        id="giveRate"
        onClick={() => setShow(true)}
        style={{ cursor: "pointer" }}
        className="text-end pe-5 fs-5"
      >
        <FontAwesomeIcon icon={faClipboard} /> قدم له تقييم
      </p>

      <Modal show={show} onHide={closeBoxShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>تحديث الهاتف </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center ">
            <StarsRating
              style={{ style: { fontSize: "50px" } }}
              value={ value ? value : 0 }
              onChange={(value: any) => {
                setValue(value);
              }}
            />
            <h2 className="px-4 mt-2 text-dark">{value}/5</h2>
          </div>

          {success && <div className="alert alert-success mt-2"> <FontAwesomeIcon icon={faCheck} className="px-2"/>{success}</div>}
          {error && <div className="alert alert-danger mt-2"><FontAwesomeIcon icon={faXmark}  className="px-2"/>{error}</div>}
          {error && !token && (
            <p>
              اضغط هنا لإنشاء حساب
              <Link
                to="/register"
                className="text-end px-2 text-decoration-none fw-bold"
              >
                إنشاء حساب
              </Link>
            </p>
          )}
        </Modal.Body>

        <Modal.Footer className="justify-content-start">
          <Button variant="success" onClick={handleClick}>
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

export default GiveRate;
