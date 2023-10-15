import axios from "axios";
import "../StyleDesign/meAsWorker.css";
import { useEffect, useState } from "react";
import WorkerProfil from "../components/profileWorker/WorkerProfil";
const MeAsWorker = () => {
  const url = process.env.REACT_APP_port;
  const [WorkerInformations, setWorkerInformations] = useState<any>(null);
  const [profilPicture, setProfilePicture] = useState<any>(null);
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

 

  if (!WorkerInformations) {
    return <p>wait</p>;
  }
 
  return (
    <div>
      {profilPicture && (
        <WorkerProfil
          profilPicture={profilPicture}
          WorkerInformations={WorkerInformations}
        />
      )} 
    </div>  
  );
};

export default MeAsWorker;
