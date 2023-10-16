import { useState, useEffect } from "react";
import "../../StyleDesign/meAsWorker.css";
import WorkerDiscreption from "./WorkerDiscreption";
import axios from "axios";
import UpdateData from "../updateData/UpdateData";

export type UserData = {
  type: null | string;
  informations: Array<any>;
};

const WorkerProfil = ({ profilPicture, WorkerInformations }: any) => {
  const url: string = process.env.REACT_APP_port + "/meAs";
  const [number, setNumber] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [showUpdateDiv, setShowUpdateDiv] = useState(false);
  const [updateData, setUpdateData] = useState<UserData>({
    type: null,
    informations: [],
  });
  const {
    firstName,
    lastName,
    discreption,
    phone,
    state,
    delegation,
    workName,
  } = WorkerInformations;

  const getCurrentUser = async () => {
    const newUrl = url + localStorage.getItem("User");
    try {
      await axios
        .get(newUrl, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log("successfuly", res.data);
          setUser(res.data.user);
        });
    } catch (err) {
      console.log("ther is an error to get current user ", err);
    }
  };

  const chooseImg = () => {
    const imgUrl = `url('/images/home/builder.jpg')`;
    return imgUrl;
  };
  const handleClick = (numb: number) => {
    if (numb === 1) {
      setNumber(1);
    } else if (numb === 2) {
      setNumber(2);
    } else {
      setNumber(3);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      isThisMe();
    }
  }, [user]);

  const isThisMe = () => {
    if (user) {
      return setIsMe(user._id === WorkerInformations._id);
    }
    return setIsMe(false);
  };

  const handleUpdate = (type: string, informations: Array<any>) => {
    const ourData = {
      type,
      informations,
    };
    setUpdateData(ourData);
    setShowUpdateDiv(true);
  };

  return (
    <div>
      <div className={showUpdateDiv ? " " : "d-none"}>
        <UpdateData updateData={updateData} setShowUpdateDiv={setShowUpdateDiv} />
      </div>
      <div
        className={
          !showUpdateDiv
            ? "Profilbackground opacity-100 "
            : "Profilbackground opacity-25  "
        }
        style={{ zIndex: "12" }}
      >
        <div id="content">
          <div
            className="z-8 position-absolute"
            style={{ backgroundImage: chooseImg() }}
            id="couvertImg"
          ></div>
          <div className="z-5 position-absolute">
            <div
              className="z-8 position-absolute"
              style={{ backgroundImage: `url('${profilPicture}')` }}
              id="pdp"
            ></div>
          </div>
          <div id="workerName" className="d-flex">
            {isMe && (
              <h1
                className="px-2"
                onClick={() => handleUpdate("name", [firstName, lastName])}
              >
                X
              </h1>
            )}
            <h1 className="fw-bold ">
              {firstName} {lastName}
            </h1>
          </div>
          <div className="  list-group">
            <hr
              className="mx-5 d-flex justify-content-center "
              style={{ width: "80%" }}
            />
            <div className="d-flex  justify-content-center ">
              <button
                type="button"
                className={
                  number === 1
                    ? "list-group-item list-group-item-action active mx-2 text-center"
                    : "list-group-item list-group-item-action  text-center"
                }
                onClick={() => {
                  handleClick(1);
                }}
                style={{ width: "20%" }}
              >
                معلومات
              </button>
              <button
                type="button"
                className={
                  number === 2
                    ? "list-group-item list-group-item-action active mx-2 text-center"
                    : "list-group-item list-group-item-action text-center "
                }
                onClick={() => {
                  handleClick(2);
                }}
                style={{ width: "20%" }}
              >
                الصور
              </button>
              <button
                type="button"
                className={
                  number === 3
                    ? "list-group-item list-group-item-action active mx-2 text-center"
                    : "list-group-item list-group-item-action text-center "
                }
                onClick={() => {
                  handleClick(3);
                }}
                style={{ width: "20%" }}
              >
                تعليقات
              </button>
            </div>
          </div>
          <hr
            className="mx-5 d-flex justify-content-center "
            style={{ width: "80%" }}
          />
        </div>
        {number === 1 && (
          <WorkerDiscreption
            handleUpdate={handleUpdate}
            isMe={isMe}
            state={state}
            delegation={delegation}
            discreption={discreption}
            phone={phone}
            workName={workName}
          />
        )}
      </div>
    </div>
  );
};

export default WorkerProfil;
