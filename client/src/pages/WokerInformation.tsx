import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChooseDomain from "../components/ChooseDomain";

type WorkerInformations = {
  workName: string;
  discreption: string;
  experience: number;
};

const WorkerInformation = () => {
  const url: any = process.env.REACT_APP_port ;
  const navigate = useNavigate();
  const inputImg = useRef<any>(null);
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [userFile, setUserFile] = useState<any>();
  const [errors, setErrors] = useState<null | string>(null);
  const [workerInformations, setWorkerInformations] =
    useState<WorkerInformations>({
      workName: "",
      discreption: "",
      experience: -1,
    });

  const handleChange = (e: any, name: string) => {
    setWorkerInformations((prevWorkerInformation) => {
      return { ...prevWorkerInformation, [name]: e.target.value };
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  // this function to create new schema in the data base for rating and comments workers  
  const createSchemaForRatingAndComments=async()=>{
    try{
     await axios.get(url+'/rateWorker',{
      headers: {
        token: localStorage.getItem("Token"),
      },
    }) 
  }catch(error:any){
      {error&&console.log('error to create schema for rating workers',error.response.data)}
      }

  }

  const onUplodeImage = () => {
    if (inputImg.current) {
      inputImg.current.click();
    }
  };

  /*to show the image to the client  */
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file !== undefined) {
      setUserFile(file);
      const imagesUploded = (
        window.URL ? URL : window.webkitURL
      ).createObjectURL(file);
      setUserPhoto(imagesUploded);
    }
  };

  const sendWorkerInformation = async () => {
    const jsonWorkerInformations = JSON.stringify(workerInformations);
    const formData = new FormData();
    formData.append("file", userFile);
    formData.append("document", jsonWorkerInformations);
    console.log('form data ',userFile)

    try {
      await axios
        .put(url+ "/meAsWorker", formData, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          toast.success("تم إنشاؤه بنجاح");
          redirectUser();
        });
    } catch (err: any) {
      if (err.response.data) {
        return toast.error(err.response.data.message);
      }
    }
  };

  const chooseImg = () => {
    const imgUrl = `url('/images/profil.jpg')`;
    if (userPhoto) {
      return `url(${userPhoto})`;
    }
    return imgUrl;
  };

  const cheackInputs = (): boolean => {
    if (workerInformations.workName === "") return false;
    if (
      workerInformations.experience === -1 ||
      workerInformations.experience === null
    )
      return false;
    if (workerInformations.discreption === "") return false;
    return true;
  };

  const handleClick = async () => {
    const chearkInputs = cheackInputs();
    if (!chearkInputs) {
      return setErrors("يرجى استكمال جميع المعلومات");
    }
    if (workerInformations.experience < 0) {
      return setErrors("يرجى وظع سنوات الخبرة ");
    }
    if (!userPhoto) {
      return setErrors("يرجي وضع صورتك الشخصية");
    }
    await sendWorkerInformation();
  };

  const redirectUser = () => {
    return setTimeout(() => {
      navigate("/me");
    }, 5000);
  };

  useEffect(()=>{
    createSchemaForRatingAndComments()
  },[])

  if (localStorage.getItem("User") === "Client")
    return <h1 className="text-center pt-5">404 NOT FOUND :(</h1>;

  return (
    <div className="background">
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
            <div style={{ backgroundImage: chooseImg() }}  id="imgUploded"></div>
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

          <div>
            <ChooseDomain
              workName={workerInformations.workName}
              handleChange={handleChange}
            />
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
              min={-1}
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
          {errors && <div className="alert alert-danger">{errors}</div>}
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default WorkerInformation;
