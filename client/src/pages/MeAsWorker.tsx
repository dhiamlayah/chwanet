import axios from "axios";
import "../StyleDesign/meAsWorker.css";
import { useEffect, useState } from "react";
import WorkerProfil from "../components/profileWorker/WorkerProfil";
const MeAsWorker = () => {
  const url = process.env.REACT_APP_port;
  const [WorkerInformations, setWorkerInformations] = useState<any>(null);
  const [profilPicture, setProfilePicture] = useState<any>(null);
  const [number, setNumber] = useState(1);
  const getWorkerInformation = async () => {
    try {
      await axios
        .get(url + "/meAsWorker", {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          setWorkerInformations(res.data.user);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const chooseImg = () => {
    const imgUrl = `url('/images/home/builder.jpg')`;

    return imgUrl;
  };

  const getWorkerPicture = async (photo: any) => {
    try {
      await axios.get(url + "/userPicture/" + photo.filename).then((res) => {
        console.log("hello", res.config.url);
        setProfilePicture(res.config.url);
      });
    } catch (err) {
      console.log("there is an error to get imageUrl", err);
    }
  };

  useEffect(() => {
    getWorkerInformation();
  }, []);
  useEffect(() => {
    if (WorkerInformations) {
      getWorkerPicture(WorkerInformations.photo);
    }
  }, [WorkerInformations]);

  const handleClick = (numb: number) => {
    if (numb === 1) {
      setNumber(1);
    } else if (numb === 2) {
      setNumber(2);
    } else {
      setNumber(3);
    }
  };

   if (!WorkerInformations) {
    return <p>wait</p>;
  }
  const {
    firstName,
    lastName,
    discreption,
    phone,
    state,
    delegation,
    workName,
  } = WorkerInformations;
  return (

    <div>
{profilPicture &&    <WorkerProfil profilPicture={profilPicture} WorkerInformations={WorkerInformations} />
}    </div> // <div className="Profilbackground  ">
    //   <div id="content">
    //     <div
    //       className="z-8 position-absolute"
    //       style={{ backgroundImage: chooseImg() }}
    //       id="couvertImg"
    //     ></div>
    //     <div className="z-5 position-absolute">
    //       <div
    //         className="z-8 position-absolute"
    //         style={{ backgroundImage: `url('${profilPicture}')` }}
    //         id="pdp"
    //       ></div>
    //     </div>

    //     <div id="workerName">
    //       <h1 className="fw-bold ">
    //         {firstName} {lastName}
    //       </h1>
    //     </div>
    //     <div className="  list-group">
    //       <hr
    //         className="mx-5 d-flex justify-content-center "
    //         style={{ width: "80%" }}
    //       />

    //       <div className="d-flex  justify-content-center ">
    //         <button
    //           type="button"
    //           className={
    //             number === 1
    //               ? "list-group-item list-group-item-action active mx-2"
    //               : "list-group-item list-group-item-action "
    //           }
    //           onClick={() => {
    //             handleClick(1);
    //           }}
    //           style={{ width: "20%" }}
    //         >
    //           A second button item
    //         </button>
    //         <button
    //           type="button"
    //           className={
    //             number === 2
    //               ? "list-group-item list-group-item-action active mx-2"
    //               : "list-group-item list-group-item-action "
    //           }
    //           onClick={() => {
    //             handleClick(2);
    //           }}
    //           style={{ width: "20%" }}
    //         >
    //           A second button item
    //         </button>
    //         <button
    //           type="button"
    //           className={
    //             number === 3
    //               ? "list-group-item list-group-item-action active mx-2"
    //               : "list-group-item list-group-item-action "
    //           }
    //           onClick={() => {
    //             handleClick(3);
    //           }}
    //           style={{ width: "20%" }}
    //         >
    //           A second button item
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {number === 1 && (
    //     <div
    //       id="workerData"
    //       className="pt-5 text-end"
    //       style={{ backgroundColor: "#rgb(255 224 217 / 28%)" }}
    //     >
    //       <div id="photo" className="m-1">
    //         <div className="border border-secondary-subtle  p-1 ">
    //           <p className="fw-bold">{workName}</p>
    //           <p>{discreption}</p>
    //         </div>
    //       </div>
    //       <div className="border border-secondary-subtle m-1 " id="cartId">
    //         <p>
    //           <span className="fw-bold">هاتف : </span>
    //           {phone}
    //         </p>
    //         <p>
    //           <span className="fw-bold">ولاية : </span>
    //           {state}
    //         </p>
    //         <p>
    //           <span className="fw-bold">مدينة :</span>
    //           {delegation}
    //         </p>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default MeAsWorker;
