import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChooseDomain from "../components/ChooseDomain";
import BoxInformation from "../components/boxMessages/boxInformation";
import NotFound from "./NotFound";

type WorkerInformations = {
  workName: string;
  discreption: string;
  experience: number;
};

const WorkerInformation = () => {
  // Regular expression to match Arabic characters
  const arabicRegex =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  const [wait, setWait] = useState(false);
  const url: string | undefined = process.env.REACT_APP_port;
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

  const [open, setOpen] = useState(false);
  const [newDomain, setNewDomain] = useState<string>("");
  const [writeRight, setWriteRight] = useState({
    newDomain: "text-start",
    discreption: "text-start",
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
  const createSchemaForRatingAndComments = async () => {
    try {
      await axios.get(url + "/rateWorker", {
        headers: {
          token: localStorage.getItem("Token"),
        },
      });
    } catch (error: any) {
      {
        error &&
          console.log(
            "error to create schema for rating workers",
            error.response.data
          );
      }
    }
  };

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

  const sendForAddingNewDomain = async () => {
    try {
      await axios
        .post(
          url + "/Admin/newDomain",
          {
            newDomain,
          },
          {
            headers: {
              token: localStorage.getItem("Token"),
            },
          }
        )
        .then(() => {
          setOpen(true);
          setWait(false);
        });
    } catch (err: any) {
      setWait(false);
      if (err.respons) {
        return toast.error(err.response.data.message);
      } else {
        setErrors("لا يمكن الاتصال بالسرفر");
      }
    }
  };

  const sendWorkerInformation = async () => {
    const jsonWorkerInformations = JSON.stringify(workerInformations);
    const formData = new FormData();
    formData.append("file", userFile);
    formData.append("document", jsonWorkerInformations);

    try {
      await axios
        .put(url + "/meAsWorker", formData, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then(() => {
          setErrors(null);
          if (
            workerInformations.workName === "أخرى (أريد إضافة عملي)" &&
            newDomain.trim() !== ""
          ) {
            sendForAddingNewDomain();
          } else {
            toast.success("تم إنشاؤه بنجاح");
            redirectUser();
          }
        });
    } catch (err: any) {
      setWait(false);
      if (err.response) {
        return toast.error(err.response.data.message);
      } else {
        setErrors(",لا يمكن الاتصال بالسرفر حاول ثانية");
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
    if (workerInformations.discreption.trim() === "") return false;
    if (
      workerInformations.workName === "أخرى (أريد إضافة عملي)" &&
      newDomain.trim() === ""
    )
      return false;
    return true;
  };

  const handleClick = async () => {
    const chearkInputs = cheackInputs();
    if (!chearkInputs) {
      return setErrors("يرجى استكمال جميع المعلومات");
    }
    if (workerInformations.experience < 0) {
      return setErrors("يرجى وظع سنوات الخبرة");
    }
    if (!userPhoto) {
      return setErrors("يرجي وضع صورتك الشخصية");
    }
    setWait(true);
    await sendWorkerInformation();
  };

  const redirectUser = () => {
    return setTimeout(() => {
      setWait(false);
      navigate("/profile/me");
    }, 2000);
  };

  useEffect(() => {
    createSchemaForRatingAndComments();
  }, []);

  if (localStorage.getItem("User") === "Client")
    return  <NotFound/>

  return (
    <div className="background">
      <BoxInformation open={open} />
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
            <div style={{ backgroundImage: chooseImg() }} id="imgUploded"></div>
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
          {workerInformations.workName === "أخرى (أريد إضافة عملي)" && (
            <div className="mb-3 text-white text-end">
              <label htmlFor="name" className="form-label mx-2 ">
                :أضف اسم عملك
              </label>
              <input
                type="text"
                className={`form-control text-white   ${writeRight.newDomain}`}
                id="name"
                placeholder="أضف اسم عمل"
                aria-describedby="emailHelp"
                value={newDomain}
                onChange={(e) => {
                  setNewDomain(e.target.value);
                  if (arabicRegex.test(newDomain.trim())) {
                    setWriteRight((prev) => {
                      return { ...prev, newDomain: "text-end" };
                    });
                  } else {
                    setWriteRight((prev) => {
                      return { ...prev, newDomain: "text-start" };
                    });
                  }
                }}
                style={{ backgroundColor: "#ffffff4f" }}
              />
            </div>
          )}

          <div className="mb-3 text-white text-end">
            <label htmlFor="tlph" className="form-label">
              :صف مهاراتك وخبراتك
            </label>
            <textarea
              placeholder="سيتم عرض هذا النص في ملفك الشخصي لجذب العميل"
              style={{ backgroundColor: "#ffffff4f" }}
              id="text"
              className={`form-control text-light fs-9 ${writeRight.discreption}`}
              value={workerInformations.discreption}
              onChange={(e) => {
                handleChange(e, "discreption");
                if (arabicRegex.test(workerInformations.discreption.trim())) {
                  setWriteRight((prev) => {
                    return { ...prev, discreption: "text-end" };
                  });
                } else {
                  setWriteRight((prev) => {
                    return { ...prev, discreption: "text-start" };
                  });
                }
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
            {!wait ? (
              "سجل"
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
          {errors && <div className="alert alert-danger">{errors}</div>}
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default WorkerInformation;
