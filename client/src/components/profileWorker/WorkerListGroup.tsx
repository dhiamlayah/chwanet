const WorkerListGroup = ({number,handleClick}:any) => {
    return (
        <div className="  list-group">
        <hr
          className="mx-5 d-flex justify-content-center "
          style={{ width: "80%" }}
        />
        <div className="d-flex  justify-content-center ">
          <button
            type="button"
            className={
              number === 1
                ? "list-group-item list-group-item-action active mx-2 text-center"
                : "list-group-item list-group-item-action  text-center"
            }
            onClick={() => {
              handleClick(1);
            }}
            style={{ width: "20%" }}
          >
            معلومات
          </button>
          <button
            type="button"
            className={
              number === 2
                ? "list-group-item list-group-item-action active mx-2 text-center"
                : "list-group-item list-group-item-action text-center "
            }
            onClick={() => {
              handleClick(2);
            }}
            style={{ width: "20%" }}
          >
            الصور
          </button>
          <button
            type="button"
            className={
              number === 3
                ? "list-group-item list-group-item-action active mx-2 text-center"
                : "list-group-item list-group-item-action text-center "
            }
            onClick={() => {
              handleClick(3);
            }}
            style={{ width: "20%" }}
          >
            تعليقات
          </button>
        </div>
        <hr
        className="mx-5 d-flex justify-content-center "
        style={{ width: "80%" }}
          />
      </div>
   
      );
}
 
export default WorkerListGroup;