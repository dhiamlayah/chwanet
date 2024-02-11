import { useState } from "react";
import ListOfNewWorkName from "../components/adminComponents/ListOfNewWorkName";
import ChooseBetwen from "../components/adminComponents/ChooseBetwen";
import AllWorkNameExist from "../components/adminComponents/ListOfAllWorkNamesExist";

const AdminSpace = () => {
   const  [number,setNumber]=useState<number>(1)

  return (
    <div className=" pt-5 bg-secondary pb-2 " style={{minHeight:"100vh"}}>
      <ChooseBetwen number={number} setNumber={setNumber}/>
      {number===1 && <ListOfNewWorkName/>}
      {number=== 2 && <AllWorkNameExist/>}
    </div>
  );
};

export default AdminSpace;
