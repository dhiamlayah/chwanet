const ChooseBetwen = ({number,setNumber}:any) => {
  return (
    <div className="  list-group     ">
      <hr className="mx-5 d-flex justify-content-center   " />
      <div className="d-flex justify-content-center pt-5 ">
          <div className="d-flex  justify-content-center  w-50   ">
            <button
              type="button"
              className={
                number === 1
                  ? "list-group-item border  mx-2   bg-dark list-group-item-action active   text-center"
                  : "list-group-item  list-group-item-action  text-center"
              }
              onClick={() => {
                setNumber(1);
              }}
            >
              New Works
            </button>
            <button
              type="button"
              className={
                number === 2
                  ? "list-group-item border    mx-2  bg-dark list-group-item-action active   text-center"
                  : "list-group-item   list-group-item-action text-center "
              }
              onClick={() => {
                setNumber(2);
              }}
            >
              All Works
            </button>
            <button
              type="button"
              className={
                number === 3
                  ? "list-group-item border    mx-2   bg-dark list-group-item-action active  text-center"
                  : "list-group-item    list-group-item-action text-center "
              }
              onClick={() => {
                setNumber(3);
              }}
            >
              All Workers
            </button>
            <button
              type="button"
              className={
                number === 4
                  ? "list-group-item border   mx-2  bg-dark list-group-item-action active  text-center"
                  : "list-group-item    list-group-item-action text-center "
              }
              onClick={() => {
                setNumber(4);
              }}
            >
              All Clients
            </button>
          </div>
      </div>
      <hr className="mx-5 d-flex justify-content-center " />
    </div>
  );
};

export default ChooseBetwen;
