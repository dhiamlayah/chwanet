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


  if (updateData.type === "phone"){
    return (
      <div className="text-light text-center ">
        <h2 className="text-end px-3 p-2"> : الهاتف </h2>
        <p className="text-end px-3">
          تذكر أن رقمك مطلوب لتسجيل الدخول وتأكد من أنه يعمل لسهولة اتصال العميل
          بك
        </p>
        <input
          type="text"
          className="w-50 fw-bold text-center my-2 "
          style={{ height: "50px", fontSize: "20px" }}
          value={firstData}
          onChange={(e) => handleChange(e)}
        />
        <br />
      </div>
      )
    }
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
  if (updateData.type === "discreption") {
    return (
      <div className="text-light text-center ">
        <h2 className="text-end px-3 p-2"> : صف حياتك المهنية </h2>
        <p className="text-end px-3">
          تذكر أن رقمك مطلوب لتسجيل الدخول وتأكد من أنه يعمل لسهولة اتصال العميل
          بك
        </p>
        <textarea
          className="w-50 fw-bold text-center my-2 "
          style={{ height: "150px",  }}
          value={firstData}
          onChange={(e) => handleChange(e)}
        />
        <br />
      </div>
    );
  }
  
  return null;
};

export default UpdateOneThing;
