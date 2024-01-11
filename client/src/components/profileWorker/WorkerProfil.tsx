import { useState, useEffect,createContext } from "react";
import axios from "axios";

import WorkerDiscreption from "./WorkerDiscreption";
import UpdateData from "../updateData/UpdateData";
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


const WorkerProfil = ({ profilPicture, WorkerInformations }: any) => {
  const url: string = process.env.REACT_APP_port + "/meAs";
  const [WorkerRate,setWorkerRate]=useState({rate:0,length:0})
  const [number, setNumber] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [showUpdateDiv, setShowUpdateDiv] = useState(false);
  const [updateData, setUpdateData] = useState<UserData>({
    type: null,
    informations: [],
  });

  const {_id} = WorkerInformations;
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
 

  const getWorkerRate = async()=>{
    const url: string = process.env.REACT_APP_port + `/rateWorker/${_id}` ;
    await axios.get(url).then((res:any)=>{
        console.log("we get worker rate ",res.data)
        setWorkerRate(res.data)
    }).catch((err:any)=>{
      console.log("we can't get worker rate ",err.response.data)
    })
  }

  const handleClick = (numb: number) => {
    if (numb === 1) {
      setNumber(1);
    } else if (numb === 2) {
      setNumber(2);
    } else {
      setNumber(3);
    }
  };
  const handleUpdate = (type: string, informations: Array<any>) => {
    const ourData = {
      type,
      informations,
    };
    setUpdateData(ourData);
    setShowUpdateDiv(true);
  };
  const isThisMe = () => {
    if (user) {
      return setIsMe(user._id === WorkerInformations._id);
    }
    return setIsMe(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("Token");
    getWorkerRate()
    if (token) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (user) {    
      isThisMe();
    }
  }, [user]);

  

  
  return (
     <globalComponents.Provider value={{WorkerInformations,WorkerRate,handleUpdate,isMe,profilPicture,user}}>
     <div
         className='w-100'
         style={!showUpdateDiv ? {}  : {overflow:"hidden",maxHeight:'100vh'}}
     >
       <div className={showUpdateDiv ? " " : "d-none"}>
         <UpdateData updateData={updateData} setShowUpdateDiv={setShowUpdateDiv} />
       </div>
       <div
         className={!showUpdateDiv ? " Profilbackground opacity-100 "  : "BackProfilbackground  "}
         style={{ zIndex: "12" }}
       >
         <div id="content" className={!showUpdateDiv? "": "opacity-25"}  >
           <WorkerImages />
           <WorkerName />
           <WorkerListGroup number={number} handleClick={handleClick}/>
           <div style={{minHeight:'50vh', overflow:'hidden'}} className="mb-5">
              {number === 1 && !showUpdateDiv && (<WorkerDiscreption/> )}
              {number === 2 && !showUpdateDiv && (<PicturesLife/>)}
              {number === 3 && !showUpdateDiv && (<WorkerComments />)}
            </div>
         </div>
           
        </div>
     </div>
  
     </globalComponents.Provider>
  );
};

export default WorkerProfil;
