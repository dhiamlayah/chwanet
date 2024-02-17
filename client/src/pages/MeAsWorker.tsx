import { useEffect, useState } from "react";
import WorkerProfil from "../components/profileWorker/WorkerProfil";
import LodingPage from "../loading";
import axios from "axios";

import "../StyleDesign/meAsWorker.css";

const MeAsWorker = () => {
  const url = process.env.REACT_APP_port;
  const [WorkerInformations, setWorkerInformations] = useState<any>(null);
  const [go, setGo] = useState<boolean>(false);          // just a variable to sheack if everythnig ok we move to the next component (step)
  const [update, setUpdate] = useState<boolean>(false);  //whene we update somthing we rerender the data with this boolean
  const [errorUser, setErrorUser] = useState<null | string>(null);
  const [errorServer, setErrorServer] = useState<null | string>(null);

  const getWorkerInformation = async () => {
    await axios
      .get(url + "/meAsWorker", {
        headers: {
          token: localStorage.getItem("Token"),
        },
      })
      .then((res: any) => {
        setErrorServer(null);
        setErrorUser(null);
        setWorkerInformations(res.data.user);
      })
      .catch((err: any) => {
        if (err.response) {
          setErrorUser(err.response.data.message);
        } else {
          setErrorServer("cant connect to server");
        }
      });
  };

  const getWorkerPicture = async (photo: any) => {
    try {
      await axios
        .get(url + `/userPicture/${WorkerInformations._id}/` + photo.filename)
        .then(() => {
          setErrorServer(null);
          setErrorUser(null);
          setGo(true);
        });
    } catch (err) {
      window.location.pathname = "/register/info";
    }
  };

   // get information and when we update data or make a changes we call server to get updates
   useEffect(() => {
    getWorkerInformation();
  }, [update]);

  useEffect(() => {
    if (WorkerInformations) {
      getWorkerPicture(WorkerInformations.photo);
    }
  }, [WorkerInformations]);



  // if worker not exist
  if (errorUser)
    return (
      <div
        className="position-relative"
        style={{ backgroundColor: "#EEEEEE", height: "100vh" }}
      >
        <div className="d-lg-flex d-block  position-absolute top-50 start-50 translate-middle   ">
          <div>
            <h1 className="lead fw-bold opacity-75 pt-5 mt-2 text-center text-break">
              لم يتم العثور على الملف الشخصي لهذا عامل
            </h1>
            <p className="lead text-break text-center">
              {" "}
              ساعدنا على تطوير هذا الموقع <br />
              إذا كنت تعرف عمالًا محترفين <br />
              فأخبرهم عنا لإنشاء منصة وسعة ومتنوعة{" "}
            </p>
          </div>
          <div>
            <img
              src="../images/noWorkerFound.png"
              style={{ width: "100%", height: "auto" }}
              alt="server down"
            />
          </div>
        </div>
      </div>
    );

  //if error from dataBase or server
  if (errorServer) {
    return (
      <div
        className="position-relative"
        style={{ backgroundColor: "#EEEEEE", height: "100vh" }}
      >
        <div className="d-lg-flex d-block  position-absolute top-50 start-50 translate-middle">
          <div>
            <h1 className="lead fw-bold opacity-75 pt-5 mt-3 text-center text-break">
              فشل شيء ما فلسرفير من فضلك أعد تحميل الصفحة{" "}
            </h1>
            <div className="d-flex justify-content-center pt-3 ">
              <button
                className="btn btn-dark text-center  opacity-75"
                onClick={() => {
                  window.location.pathname = "/";
                }}
              >
                {" "}
                تحميل الصفحة
              </button>
            </div>
          </div>
          <div>
            <img
              src="../images/serverDown.png"
              style={{ width: "80%", height: "auto" }}
              alt="server down"
            />
          </div>
        </div>
      </div>
    );
  }
  if (go)
    return (
      <div>
        <WorkerProfil
          WorkerInformations={WorkerInformations}
          setUpdate={setUpdate}
        />
      </div>
    );

  return <LodingPage />;
};

export default MeAsWorker;
