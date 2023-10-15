 import UpdateTwoThings from "./UpdateTwoThings";

const UpdateData = ({ updateData }: any) => {

   

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle z-2  rounded-4 border border-light w-50 h-50 "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      {updateData.type === "name" && <UpdateTwoThings updateData={updateData}/>}
      {updateData.type === "state" && <UpdateTwoThings updateData={updateData}/>}
       
    
    <button type="button" className="btn btn-outline-warning m-5 ">تحديث</button>

    </div>
  );
};

export default UpdateData;
