import { useState } from "react";
import ListOfNewWorkName from "../components/adminComponents/ListOfNewWorkName";
import ChooseBetwen from "../components/adminComponents/ChooseBetwen";

const AdminSpace = () => {
   const  [number,setNumber]=useState<number>(1)

  return (
    <div className=" pt-5 bg-secondary " style={{minHeight:"100vh"}}>
      <ChooseBetwen number={number} setNumber={setNumber}/>
      <ListOfNewWorkName/>
    </div>
  );
};

export default AdminSpace;
