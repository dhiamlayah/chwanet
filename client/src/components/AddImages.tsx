import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import AnimatedPage from "../util/AnimatedPage";
import axios from "axios";

const AddImages = ({ back }: any) => {
   // Regular expression to match Arabic characters
   const arabicRegex =
   /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const [writeRight, setWriteRight] = useState("text-start");
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [userFile, setUserFile] = useState<any>();
  const [descreption, setDescreption] = useState<null | string>(null);
  const url: string | undefined = process.env.REACT_APP_port;
  const inputImg = useRef<any>(null);
  const [wait, setWait] = useState(false);
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      setUserFile(file);
      const imagesUploded = (
        window.URL ? URL : window.webkitURL
      ).createObjectURL(file);
      setUserPhoto(imagesUploded);
    }
  };
  const onUplodeImage = () => {
    if (inputImg.current) {
      inputImg.current.click();
    }
  };

  const sendPictureToServer = async () => {
    const formData = new FormData();
    const jsonWorkerDescription = JSON.stringify(descreption);
    formData.append("file", userFile);
    formData.append("discreption", jsonWorkerDescription);
    try {
      await axios
        .post(url + "/workerPictures", formData, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then(() => {
          setWait(false);
          toast.success("تم إنشاؤه بنجاح");
          redirectUser();
        });
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("لا يمكن الاتصال بالسرفر");
      }
    }
  };

  const redirectUser = () => {
    return setTimeout(() => {
      back(false);
    }, 2000);
  };

  const handleClick = () => {
    setWait(true);
    sendPictureToServer();
  };

  return (
    <div className="position-relative" style={{ minHeight: "35vh" }}>
      <ToastContainer />
      <div
        className="position-absolute top-0 start-0 m-1"
        style={{ cursor: "pointer" }}
        onClick={() => back(false)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="fs-5" />
      </div>
      <AnimatedPage>
        <div className=" d-flex justify-content-center align-items-center pt-5">
          <div className="d-block">
            <div className="d-flex justify-content-center my-2">
              <button className="btn btn-warning " onClick={onUplodeImage}>
                + تحميل صور
              </button>
            </div>
            {userPhoto && (
              <div className="d-block">
                <div className="d-flex justify-content-center align-items-lg-end align-items-center  ">
                  <img
                    src={userPhoto}
                    onClick={onUplodeImage}
                    style={{
                      width: "80%",
                      height: "auto",
                      boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                    }}
                    alt="photo uploded "
                  />
                </div>
                <div className="m-3">
                  <div className="d-flex justify-content-end my-2">
                    <label
                      htmlFor="exampleInputPassword1 text-end "
                      className="form-label fs-5 fw-bold"
                    >
                      وصف للصورة
                    </label>
                  </div>
                  <textarea
                    className={`form-control border border-dark ${writeRight}`}
                    value={descreption ? descreption : ""}
                    onChange={(e) => {
                      setDescreption(e.target.value)
                      if (arabicRegex.test(e.target.value.trim())) {
                        setWriteRight("text-end");
                      } else {
                        setWriteRight("text-start");
                      }
                    }}
                    id="exampleInputPassword1"
                  />
                </div>
                <div>
                  <button
                    className="btn btn-outline-success mb-4 mx-1 "
                    onClick={handleClick}
                  >
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
                  </button>
                </div>
              </div>
            )}
            <input
              className="d-none"
              type="file"
              ref={inputImg}
              onChange={handleChangeFile}
              accept="image/*"
            />
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default AddImages;
