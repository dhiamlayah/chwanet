const WorkerName = ({handleUpdate,firstName,lastName,isMe}:any) => {
    return (  
        <div id="workerName" className="d-flex">
            {isMe && (
              <h1
                className="px-2"
                onClick={() => handleUpdate("name", [firstName, lastName])}
              >
                ...
              </h1>
            )}
            <h1 className="fw-bold ">
              {firstName} {lastName}
            </h1>
          </div> 
    );
}
 
export default WorkerName;