import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import UpdateOneThing from "./UpdateOneThing";
import UpdateNames from "./UpdateNames";
import UpdateStateAndDelegations from "./UpdateStateAndDelegations";
import RateWorker from "../../util/RateWorker";

import "../../StyleDesign/UpdateData.css";

const UpdateData = ({ updateData, setShowUpdateDiv }: any) => {
  const url: string = process.env.REACT_APP_port + "/meAsWorker/" + updateData.type;
  const [state, setState] = useState<string>("");
  const [delegation, setDelegation] = useState<string>("");
  const [newData, setNewData] = useState({});
  const [error, setError] = useState<string | null>(null);
  const sendUpdate = async () => {
    try {
      await axios
        .put(url, newData, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then(() => {
          toast.success("تم تحديث البيانات بنجاح");
          redirectUser();
        });
    } catch (error: any) {
      console.log(
        "there is an error to send data to the server",
        error.message
      );
      if (error.response.data) {
        toast.error(error.response.data.message, { position: "top-right" });
      }
    }
  };
  const handleClick = () => {
    setShowUpdateDiv(false);
    setNewData({});
    setDelegation("");
    setState("");
    setError(null);
  };

  const cheakErrors = (): boolean => {
    if (updateData.type === "state") {
      if (state === "") {
        setError("لم تقم بتحديث أي شيء");
        return false;
      } else if (delegation === "") {
        setError("من فضلك ضع مدينتك");
        return false;
      }
      return true;
    } else if (
      updateData.type === "name" &&
      Object.keys(newData).length !== 2
    ) {
      setError("أكمل اسمك الكامل");
      return false;
    } else if (updateData.type === "phone") {
      const whatWeInput = Object.values(newData);
      const number = Number(whatWeInput);
      if (!number) {
        setError("رقم الهاتف خاطئ");
        return false;
      }
    } else {
      if (!Object.keys(newData).length) {
        setError("لم تقم بتحديث أي شيء");
        return false;
      } else {
        const whatWeInput = Object.values(newData);
        const newString = whatWeInput.toString();
        if (newString === "") {
          setError("لم تقم بتحديث أي شيء");
          return false;
        }
      }
    }
    return true;
  };

  const handleUpdateNewData = async () => {
    const cheakInput = cheakErrors();
    if (!cheakInput) {
      return null;
    }

    if (updateData.type === "state") {
      setNewData({ state: state, delegation: delegation });
    }
    await sendUpdate();
  };

  const redirectUser = () => {
    return setTimeout(() => {
      window.location.pathname = "/me";
    }, 1000);
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle z-2  rounded-1 border border-light  "
      id="updateData"
    >
      <ToastContainer />

      {updateData.type !== "rateWorker" && (
        <h3 className="m-2 text-light" onClick={handleClick}>
          <button
            type="button"
            className="btn-close bg-warning  "
            aria-label="Close  "
          ></button>
        </h3>
      )}
      {updateData.type === "name" && (
        <UpdateNames updateData={updateData} setNewData={setNewData} />
      )}
      {updateData.type === "state" && (
        <UpdateStateAndDelegations
          state={state}
          delegation={delegation}
          setState={setState}
          setDelegation={setDelegation}
        />
      )}
      {updateData.type === "workName" && (
        <UpdateOneThing updateData={updateData} setNewData={setNewData} />
      )}
      {updateData.type === "discreption" && (
        <UpdateOneThing updateData={updateData} setNewData={setNewData} />
      )}
      {updateData.type === "phone" && (
        <UpdateOneThing updateData={updateData} setNewData={setNewData} />
      )}
      {updateData.type === "rateWorker" && (
        <RateWorker setShowUpdateDiv={setShowUpdateDiv} />
      )}

      {updateData.type !== "rateWorker" && (
        <button
          type="button"
          className="btn btn-outline-warning m-5 "
          onClick={handleUpdateNewData}
        >
          تحديث
        </button>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default UpdateData;
