import axios from "axios";
import "../StyleDesign/meAsWorker.css";
import {  useEffect, useState } from "react";
import WorkerProfil from "../components/profileWorker/WorkerProfil";
import LodingPage from "../loading";
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
        .then((res:any) => {
          setWorkerInformations(res.data.user);
        });
    } catch (err) {
       console.log(err)
       
    }
  };
 
  const getWorkerPicture = async (photo: any) => {
    try {
      await axios.get(url + `/userPicture/${WorkerInformations._id}/` + photo.filename).then((res) => {
        setProfilePicture(res.config.url);
      });
    } catch (err) {
      console.log("there is an error to get imageUrl", err);
      window.location.pathname = '/register/info'
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

 

  
  if(profilPicture)return (
    <div>
        <WorkerProfil
          profilPicture={profilPicture}
          WorkerInformations={WorkerInformations}
        />
    </div>  
  );

  return <LodingPage />

};

export default MeAsWorker;
