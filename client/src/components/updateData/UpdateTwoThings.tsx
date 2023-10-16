import { useEffect, useState } from "react";
import ChooseStateAndDelegation from "../ChooseStateAndDelegation";
 
const UpdateTwoThings = ({updateData}:any) => {
    const [firstData,setFirstData]=useState<string>('')
    const [secondData,setSecondData]=useState<string>('')
    const handleChange= (e : any,number:number)=>{
        console.log(e.target.value)
        if(number===1){
        setFirstData(e.target.value)}
        else{
            setSecondData(e.target.value)
        }
    }
    useEffect(()=>{
        setFirstData(updateData.informations[0])
        setSecondData(updateData.informations[1])
        console.log("new data",firstData)
      },[updateData])
   
   if(updateData.type==="name") return ( 
        <div className="text-light text-center ">
          <h2 className="text-end px-3 p-2"> :   الاسم </h2>
          <input
            type="text"
            className="w-50 fw-bold text-center my-2 "
            style={{ height: "50px", fontSize: "20px" }}
            value={firstData}
            onChange={(e)=>handleChange(e,1)}
          />
          <br />
          <h2 className="text-end px-3"> :   اللقب</h2>
           <input
            type="text"
            className="w-50 fw-bold text-center my-2 "
            style={{ height: "50px", fontSize: "20px" }}
            value={secondData }
            onChange={(e)=>handleChange(e,2)}
          />
        </div>
     );
    if(updateData.type==="state"){
        return <div  className="text-light text-center  py-5 w-75 " style={{fontSize:"20px"}}>
            <ChooseStateAndDelegation state={firstData} userDelegation={secondData} setUserDelegation={setSecondData} setState={setFirstData}/>
           </div>
    }
 
 
     return null
}
 
export default UpdateTwoThings;