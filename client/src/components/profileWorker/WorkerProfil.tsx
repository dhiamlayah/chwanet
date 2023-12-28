import { useState, useEffect } from "react";
import "../../StyleDesign/meAsWorker.css";
import WorkerDiscreption from "./WorkerDiscreption";
import axios from "axios";
import UpdateData from "../updateData/UpdateData";
import WorkerImages from "./WorkerImages";
import WorkerName from "./WorkersName";
import WorkerListGroup from "./WorkerListGroup";
import WorkerComments from "./WorkerComments";

export type UserData = {
  type: null | string;
  informations: Array<any>;
};

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

  const {
    _id,
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
 

  const getWorkerRate = async()=>{
    console.log('user id ',_id)
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
   
     <div className=" w-100 " >
       <div className={showUpdateDiv ? " " : "d-none"}>
         <UpdateData updateData={updateData} setShowUpdateDiv={setShowUpdateDiv} />
       </div>
       <div
         className={!showUpdateDiv ? " Profilbackground opacity-100 "  : "BackProfilbackground  "}
         style={{ zIndex: "12" }}
       >
         <div id="content" className={!showUpdateDiv? "": "opacity-25"}  >
           <WorkerImages profilPicture={profilPicture}/>
           <WorkerName userRate={WorkerRate} handleUpdate={handleUpdate} lastName={lastName} firstName={firstName} isMe={isMe}/>
           <WorkerListGroup number={number} handleClick={handleClick}/>
         </div>
            <div style={{minHeight:'20vh', overflow:'hidden'}}>
              {number === 1 && !showUpdateDiv && (
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
                         {number === 3 && !showUpdateDiv && (
                <WorkerComments workerId={_id}/>
                         )}
            </div>
        </div>
     </div>
  

  );
};

export default WorkerProfil;
