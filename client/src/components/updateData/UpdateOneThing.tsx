import { useEffect, useState } from "react";
import ChooseDomain from "../ChooseDomain";

const UpdateOneThing = ({ updateData,setNewData }: any) => {
  const [firstData, setFirstData] = useState<number | string>("");
  
  const handleChange = (e: any, type = "") => {
    setFirstData(e.target.value);
    if(updateData.type === "phone")setNewData((prev:any)=>({...prev, ...{'phone':e.target.value.trim()}}))
    if(updateData.type === "workName")setNewData((prev:any)=>({...prev, ...{'workName':e.target.value.trim()}}))
    if(updateData.type === "discreption")setNewData((prev:any)=>({...prev, ...{'discreption':e.target.value.trim()}}))

  };


   useEffect(() => {
    setFirstData(updateData.informations[0]);
  }, [updateData]);


    
  if (updateData.type === "workName") {
    return (
      <div
        className="text-light text-center  py-5 w-75 "
        style={{ fontSize: "20px" }}
      >
        <ChooseDomain workName={firstData} handleChange={handleChange} />
      </div>
    );
  }
 
  
  return null;
};

export default UpdateOneThing;
