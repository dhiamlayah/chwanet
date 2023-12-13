import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WorkerProfil from "../components/profileWorker/WorkerProfil";
import axios from "axios";
import LodingPage from "../loading";
const Profile = ( ) => {
    const params = useParams()
    const workerId = params.id
    const url = process.env.REACT_APP_port;
    const [WorkerInformations, setWorkerInformations] = useState<any>(null);
    const [profilPicture, setProfilePicture] = useState<any>(null);

    const getWorkerInformation = async () => {
        try {
          await axios
            .get(url + `/profile/${workerId}`)
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
    
      console.log('workerInformation',WorkerInformations)

  

   if(profilPicture)return ( 
              <WorkerProfil
                profilPicture={profilPicture}
                WorkerInformations={WorkerInformations}
              />
     
     );
     return <LodingPage />
}
 
export default Profile;
