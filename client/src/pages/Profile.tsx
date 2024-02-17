import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WorkerProfil from "../components/profileWorker/WorkerProfil";
import axios from "axios";
import LodingPage from "../loading";
const Profile = () => {
  const params = useParams();
  const workerId = params.id;
  const url = process.env.REACT_APP_port;
  const [WorkerInformations, setWorkerInformations] = useState<any>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<null | string>(null);
  const [errorServer, setErrorServer] = useState<null | string>(null);

  const getWorkerInformation = async () => {
    try {
      await axios.get(url + `/profile/${workerId}`).then((res) => {
        setWorkerInformations(res.data.user);
        setErrorServer(null);
        setErrorUser(null);
      });
    } catch (err: any) {
      if (err.response) {
        setErrorUser(err.response.data.message);
      } else {
        setErrorServer('cant connect with server');
      }
    }
  };

  useEffect(() => {
    getWorkerInformation();
  }, [update]);

  if (WorkerInformations)
    return (
      <WorkerProfil
        WorkerInformations={WorkerInformations}
        setUpdate={setUpdate}
      />
    );

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
                  window.location.pathname = `/profile/${workerId}`
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

  return <LodingPage />;
};

export default Profile;
