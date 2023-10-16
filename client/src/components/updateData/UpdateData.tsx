 import UpdateOneThing from "./UpdateOneThing";
import UpdateTwoThings from "./UpdateTwoThings";
import '../../StyleDesign/UpdateData.css'
const UpdateData = ({ updateData ,setShowUpdateDiv }: any) => {

   

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle z-2  rounded-4 border border-light  "
       id="updateData"
    >
      <h2 className="mx-2 text-light" onClick={()=>setShowUpdateDiv(false)}>X</h2>
      {updateData.type === "name" && <UpdateTwoThings updateData={updateData}/>}
      {updateData.type === "state" && <UpdateTwoThings updateData={updateData}/>}
      {updateData.type === "workName" && <UpdateOneThing updateData={updateData}/>}
      {updateData.type === "discreption" && <UpdateOneThing updateData={updateData}/>} 
      {updateData.type === "phone" && <UpdateOneThing  updateData={updateData}/>}
       
      
    <button type="button" className="btn btn-outline-warning m-5 ">تحديث</button>

    </div>
  );
};

export default UpdateData;
