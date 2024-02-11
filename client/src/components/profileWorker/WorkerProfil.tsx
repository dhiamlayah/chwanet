import { useState, useEffect, createContext } from "react";
import axios from "axios";
import WorkerDiscreption from "./WorkerDiscreption";
import WorkerImages from "./WorkerImages";
import WorkerName from "./WorkersName";
import WorkerListGroup from "./WorkerListGroup";
import WorkerComments from "./WorkerComments";
import "../../StyleDesign/meAsWorker.css";
import PicturesLife from "./WorkerPicturesLife";

export type UserData = {
  type: null | string;
  informations: Array<any>;
};

export const globalComponents = createContext<any | undefined>(undefined);

const WorkerProfil = ({
  // profilPicture,
  WorkerInformations,
  setUpdate,
}: any) => {
  const url: string = process.env.REACT_APP_port + "/meAs";
  const [WorkerRate, setWorkerRate] = useState({ rate: 0, length: 0 });
  const [number, setNumber] = useState(1);
  const [clientGiveRate, setClientGiveRate] = useState<boolean>(false); //update profile if client rate worker
  const [user, setUser] = useState<any>(null);
  const [isMe, setIsMe] = useState<boolean>(false);

  // id of worker visited profile
  const { _id,Rate } = WorkerInformations;

  // get current visiter (client or worker)
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
    } catch (err :any ) {
      if(err.response){
        console.log("ther is an error to get current user ", err);
      }else{
        console.log("ther is an error to get current user ", err);
      }
    }
  };

  // get the rate of worker profile
  const getWorkerRate = async () => {
    const url: string = process.env.REACT_APP_port + `/profile/${_id}/Rate`;
    await axios
      .get(url)
      .then((res: any) => {
        setWorkerRate(res.data);
      })
      .catch((err: any) => {
        if(err.response){
          console.log("we can't get worker rate ", err.response.data);
        }
        else{
          console.log("faild to connect with data base ");

        }
      });
  };


  // sheck the visiter is the same worker profile or not
  const isThisMe = () => {
    if (user) {
      return setIsMe(user._id === WorkerInformations._id);
    }
    return setIsMe(false);
  };
  


  useEffect(() => {
    const token = localStorage.getItem("Token");
    if(Rate) setWorkerRate(Rate)
    if (token) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      isThisMe();
    }
  }, [user]);

  useEffect(() => {
    getWorkerRate();
  }, [clientGiveRate]);

  return (
    <globalComponents.Provider
      value={{
        setClientGiveRate,
        WorkerInformations,
        WorkerRate,
        isMe,
        user,
        setUpdate,
      }}
    >
      <div className=" Profilbackground  ">
        <div id="content">
          <WorkerImages />
          <WorkerName />
          <WorkerListGroup number={number} setNumber={setNumber} />

          <div
            style={{ minHeight: "50vh", overflow: "hidden" }}
            className="mb-5"
          >
            {number === 1 && <WorkerDiscreption />}
            {number === 2 && <PicturesLife />}
            {number === 3 && <WorkerComments />}
          </div>
        </div>
      </div>
    </globalComponents.Provider>
  );
};

export default WorkerProfil;
