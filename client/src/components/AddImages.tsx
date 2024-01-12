import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import AnimatedPage from "../util/AnimatedPage";
import axios from "axios";

const AddImages = ({ back }: any) => {
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [userFile, setUserFile] = useState<any>();
  const [pictureStatue,setPictureStatue]=useState<null|string>(null)
  const url: string | undefined = process.env.REACT_APP_port ;
  const inputImg = useRef<any>(null);
  
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
    formData.append("file", userFile);
    console.log('form data ',userFile)

    try {
      await axios
        .post(url+ "/workerPictures", formData, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          toast.success("تم إنشاؤه بنجاح");
          redirectUser();
        });
    } catch (err: any) {
      console.log('err to send image',err)
      if (err.response.data) {
        return toast.error(err.response.data.message);
      }
    }
  };

  const redirectUser = () => {
    return setTimeout(() => {
      back(false)
     }, 5000);
  };

  const handleClick = ()=>{
     sendPictureToServer()
  }

  return (
    <div className="position-relative" style={{ minHeight: "35vh" }}>
      <ToastContainer/>
      <div
        className="position-absolute top-0 start-0 m-1"
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
                <div>
                  <img
                    src={userPhoto}
                    onClick={onUplodeImage}
                    style={{ maxWidth: "70vh", maxHeight: "34vh" }}
                    alt=""
                  />
                </div>
                <div className="my-3">
                  <div className="d-flex justify-content-end my-2">
                    <label
                      htmlFor="exampleInputPassword1 text-end "
                      className="form-label fs-5 fw-bold"
                    >
                      وصف للصورة

                    </label>
                  </div>
                  <textarea
                    className="form-control border border-dark"
                    value={pictureStatue ? pictureStatue : ""}
                    onChange={(e)=>setPictureStatue(e.target.value)}
                    id="exampleInputPassword1"
                  />
                </div>
                <div>
                  <button className="btn btn-outline-success mb-4 " onClick={handleClick}>
                  حفظ
                  </button>
                </div>
              </div>
            )}
            <input
              className="d-none"
              type="file"
              ref={inputImg}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default AddImages;
