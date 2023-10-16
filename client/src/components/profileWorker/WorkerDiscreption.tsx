const WorkerDiscreption = ({
  discreption,
  phone,
  state,
  delegation,
  workName,
  isMe,
  handleUpdate,
}: any) => {
  console.log(isMe);

  return (
    <div
      id="workerData"
      className="pt-3 text-end "
      style={{ backgroundColor: "#rgb(255 224 217 / 28%)" }}
    >
      <div id="photo" className="m-1 p-2">
        <div className="  p-8 ">
          <div className={isMe ? "d-flex justify-content-between" : ""}>
            {isMe && <p className="p-2" onClick={()=>handleUpdate('workName',[workName])}>X</p>}
            <p className="fw-bold">{workName}</p>
          </div>
          <div className={isMe ? "d-flex justify-content-between" : ""}>
            {isMe && <p className="p-2" onClick={()=>handleUpdate('discreption',[discreption])}>X</p>}
          <p>{discreption}</p>
          </div>
         
         </div>
      </div>
      <div className="  m-1 " id="cartId">
        <div className={isMe ? "d-flex justify-content-between" : ""}>
          {isMe && <p className="" onClick={()=>handleUpdate('phone',[phone])}>X</p>}
          <p>
            <span className="fw-bold">هاتف : </span>
            {phone}
          </p>
        </div>
        <div className={isMe ? "d-flex justify-content-between" : ""}>
          {isMe && <p className="" onClick={()=>handleUpdate('state',[state])}>X</p>}
          <p>
            <span className="fw-bold">ولاية : </span>
            {state}
          </p>
        </div> 
        <div className={isMe ? "d-flex justify-content-between" : ""}>
        {isMe && <p className="">X</p>} 
            <p>
              <span className="fw-bold">مدينة :</span>
              {delegation}
            </p>
        
        </div>
      </div>
   
    </div>
  );
};

export default WorkerDiscreption;
