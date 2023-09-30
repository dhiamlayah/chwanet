import AnimatedPage from "../util/AnimatedPage";
import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { typeWork } from "../staticData/genres";

type WorkerInformations = {
  workName: string;
  discreption: string;
  experience: number;
};

const WorkerInformation = () => {
  const inputImg = useRef<any>(null);
  const workType = typeWork;
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [userFile, setUserFile] = useState<any>();

  const [workerInformations, setWorkerInformations] =
    useState<WorkerInformations>({
      workName: "",
      discreption: "",
      experience: 0,
    });

  const handleChange = (e: any, name: string) => {
    setWorkerInformations((prevWorkerInformation) => {
      return { ...prevWorkerInformation, [name]: e.target.value };
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const onUplodeImage = () => {
    if (inputImg.current) {
      inputImg.current.click();
    }
  };

  /*to show the image to the client  */
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    setUserFile(file);
    console.log(file);
    const imagesUploded = (window.URL ? URL : window.webkitURL).createObjectURL(
      file
    );
    setUserPhoto(imagesUploded);
  };
  console.log( 'localstprg',localStorage.getItem("Token"))

  const handleClick = async () => {
    const jsonWorkerInformations = JSON.stringify(workerInformations);
    const formData = new FormData();
    formData.append("file", userFile);
    formData.append("document", jsonWorkerInformations);
  try{  
    await axios.put("http://localhost:8000/register",formData,{
        headers: {
          token: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        console.log("successfuly", res.data);
       })}
    catch(err){
        console.log(err);
      };
  };
  const imgUrl = `url('/images/profil.jpg')`;

  const chooseImg = () => {
    if (userPhoto) {
      return `url(${userPhoto})`;
    }
    return imgUrl;
  };

  return (
    <div className="background">
      <AnimatedPage>
        <div
          className=" p-5"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          id="register"
        >
          <form className="text-white fw-medium" onSubmit={handleSubmit}>
            <div
              className="mb-3 text-white text-end"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div
                style={{ backgroundImage: chooseImg() }}
                id="imgUploded"
              ></div>
              <div style={{ display: "inline-grid", alignContent: "center" }}>
                <input
                  type="file"
                  className="d-none"
                  accept="image/*"
                  ref={inputImg}
                  onChange={handleChangeFile}
                />
                <label className="form-label  fw-bold  ">:صورتك الشخصية</label>
                <button className="btn btn-secondary  " onClick={onUplodeImage}>
                  تحميل الصور
                </button>
              </div>
            </div>

            <div className="mb-3 text-white text-end">
              <p className="text-end">اختر نوع عملك</p>
              <select
                style={{ backgroundColor: "#ffffff4f" }}
                className="text-end text-white"
                value={workerInformations.workName}
                onChange={(e) => handleChange(e, "workName")}
              >
                <option className="list-group-item text-white" value="">
                  {" "}
                </option>
                {workType.map((work) => {
                  return (
                    <option
                      key={work}
                      value={work}
                      className="list-group-item text-dark"
                    >
                      {work}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3 text-white text-end">
              <label htmlFor="tlph" className="form-label">
                :صف مهاراتك وخبراتك
              </label>
              <textarea
                placeholder="سيتم عرض هذا النص في ملفك الشخصي لجذب العميل"
                style={{ backgroundColor: "#ffffff4f" }}
                id="text"
                className="form-control text-light fs-9"
                value={workerInformations.discreption}
                onChange={(e) => {
                  handleChange(e, "discreption");
                }}
                rows={5}
              ></textarea>
            </div>

            <div className="mb-3 text-white text-end">
              <input
                type="number"
                min={0}
                max={35}
                className="  text-white fs-5"
                id="tlph"
                aria-describedby="emailHelp"
                style={{ backgroundColor: "#ffffff4f" }}
                value={workerInformations.experience}
                onChange={(e) => {
                  handleChange(e, "experience");
                }}
              />
              <label htmlFor="tlph" className="form-label p-2 fw-bold ">
                : سنوات الخبرة
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-warning"
              onClick={handleClick}
            >
              سجل
            </button>
          </form>

          <ToastContainer />
        </div>
      </AnimatedPage>
    </div>
  );
};

export default WorkerInformation;
