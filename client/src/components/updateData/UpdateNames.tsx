import { useEffect, useState } from "react";
 
const  UpdateNames = ({updateData,setNewData}:any) => {
    const [firstName,setFirstName]=useState<string>('')
    const [lastName,setLastName]=useState<string>('')

    const handleChange= (e : any,number:number)=>{
        console.log(e.target.value)
        if(number===1){
          setFirstName(e.target.value)
          setNewData((prev:any)=>({...prev, ...{'firstName':e.target.value.trim()}})) 
          }
        else{
          setLastName(e.target.value)
          setNewData((prev:any)=>({...prev, ...{'lastName':e.target.value.trim()}}))
         }
    
  }
  
    useEffect(()=>{
         setFirstName(updateData.informations[0])
         setLastName(updateData.informations[1])
       },[updateData])
   
  return ( 
        <div className="text-light text-center ">
          <h2 className="text-end px-3 p-2"> :   الاسم </h2>
          <input
            type="text"
            className="w-50 fw-bold text-center my-2 "
            style={{ height: "50px", fontSize: "20px" }}
            value={firstName}
            onChange={(e)=>handleChange(e,1)}
          />
          <br />
          <h2 className="text-end px-3"> :   اللقب</h2>
           <input
            type="text"
            className="w-50 fw-bold text-center my-2 "
            style={{ height: "50px", fontSize: "20px" }}
            value={lastName }
            onChange={(e)=>handleChange(e,2)}
          />
        </div>
     );
 
}
 
export default  UpdateNames;