const WorkerListGroup = ({number,setNumber}:any) => {
    return (
        <div className="  list-group">
        <hr
          className="mx-5 d-flex justify-content-center "
        />
        <div className="d-flex justify-content-center text-break   ">
          <div className="d-flex     w-75  ">
            <button
              type="button"
              className={
                number === 1
                  ? "list-group-item border   px-3  text-break   bg-black list-group-item-action active mx-2 text-center"
                  : "list-group-item px-3 list-group-item-action   text-center"
              }
              onClick={() => {
                setNumber(1);
              }}
             >
              معلومات
            </button>
            <button
              type="button"
              className={
                number === 2
                  ? "list-group-item border px-3   bg-black list-group-item-action active mx-2 text-center"
                  : "list-group-item px-3  list-group-item-action text-center "
              }
              onClick={() => {
                setNumber(2);
              }}
            >
              الصور
            </button>
            <button
              type="button"
              className={
                number === 3
                  ? "list-group-item border px-3   bg-black list-group-item-action active mx-2 text-center"
                  : "list-group-item px-3  list-group-item-action text-center "
              }
              onClick={() => {
                setNumber(3);
              }}
            >
              تعليقات
            </button>
          </div>
        </div>
        <hr
        className="mx-5 d-flex justify-content-center "
          />
      </div>
   
      );
}
 
export default WorkerListGroup;