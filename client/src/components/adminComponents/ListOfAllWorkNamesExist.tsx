import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNewWorkName from "../boxMessages/AddNewWorkName";

const AllWorkNameExist = () => {
  let count = 0
  const url = process.env.REACT_APP_port;
  const [open, setOpen] = useState<boolean>(false);
  const [updateTable,setUpdateTable]= useState<boolean>(false)

  const [worksExist, setWorksExist] = useState<null | {
    name: string;
    _id: string;
  }[]>(null);
  const getAllWorkNameExist = async () => {
    await axios
      .get(url + "/workNameList")
      .then((res: any) => {
        setWorksExist(res.data.workNames);
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("error", error.response.data.message);
        } else {
          console.log("error from the server ");
        }
      });
  };

  useEffect(() => {
    console.log("is rundred ");
    getAllWorkNameExist();
  }, [updateTable]);

  return (
    <div >
        <div className="d-flex justify-content-center py-4 ">
        <FontAwesomeIcon icon={faPlus} className=" btn btn-outline-light  border border-ligth p-3 px-5 rounded-3 " size="xl" onClick={()=>setOpen(true)}/>
        </div>

        <AddNewWorkName open={open} setOpen={setOpen} setUpdateTable={setUpdateTable}/>

      <table className="table  mt-4 ">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">name </th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody className="table-dark ">
          {worksExist &&
            worksExist.map((work) => {
                count++
              return (
                  <tr key={work._id} >
                    <th scope="row">{count}</th>
                    <td className="text-break">{work.name}</td>
           
                    <td>
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faTrash}
                        className="text-danger fs-5 px-3"
                      />
                    </td>
                  </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllWorkNameExist;
