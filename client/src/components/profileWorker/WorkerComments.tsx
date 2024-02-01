import { useState } from "react";
import "../../StyleDesign/workerComments.css";
import ClientsComments from "../ClientsComments";
import SendComments from "../SendComment";



const WorkerComments = () => {
  const [addNewComment,setAddNewComment]=useState<boolean>(false)
  return (
    <div id="Comments" style={{minHeight:"30vh"}}  >
      <ClientsComments  addNewComment={addNewComment} />
      {localStorage.getItem("User") !== "Worker" && <SendComments   setAddNewComment={setAddNewComment} />}
    </div>
  );
};

export default WorkerComments;
