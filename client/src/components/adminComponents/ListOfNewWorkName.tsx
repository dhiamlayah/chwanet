import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import AcceptNewWorkName from "../boxMessages/AcceptNewWorkName";
import DeleteWorker from "../boxMessages/DeleteWorker";

const ListOfNewWorkName = () => {
  let count = 0;
  const [openAccept, setOpenAccept] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [updateTable,setUpdateTable]= useState<boolean>(false)
  const [workerWhoAddNewName, setWorkerWhoAddNewName] = useState<null | {
    newWorkName: string;
    _id: string;
  }>(null);
  const [allNewWorklist, setAllNewDomainList] = useState<
    null | { newWorkName: string; _id: string }[]
  >(null);
  const url = process.env.REACT_APP_port;
  const getAllNewWorks = async () => {
    try {
      await axios
        .get(url + "/Admin/newDomain", {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          setAllNewDomainList(res.data.allNewDomain);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

 
  useEffect(() => {
    getAllNewWorks();
  }, [updateTable]);
  return (
    <div>
      <table className="table  mt-4 ">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">_id</th>
            <th scope="col">New Work </th>
            <th scope="col ">accept</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody className="table-dark">
          {allNewWorklist?.length &&
            allNewWorklist.map((newWork) => {
              count++;
              return (
                <tr key={newWork._id}>
                  <th scope="row">{count}</th>
                  <td className="text-break">{newWork._id}</td>
                  <td className="text-break">{newWork.newWorkName}</td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() => {
                        setWorkerWhoAddNewName(newWork);
                        setOpenAccept(true);
                      }}
                      style={{ cursor: "pointer" }}
                      icon={faCheck}
                      className="text-success fs-4 px-3"
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() => {
                        setWorkerWhoAddNewName(newWork);
                        setOpenDelete(true);
                      }}
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
      <AcceptNewWorkName
        open={openAccept}
        setOpen={setOpenAccept}
        workerWhoAddNewName={workerWhoAddNewName}
        setWorkerWhoAddNewName={setWorkerWhoAddNewName}
        setUpdateTable={setUpdateTable}

      />
      <DeleteWorker
        open={openDelete}
        setOpen={setOpenDelete}
        workerId={workerWhoAddNewName?._id}
        setWorkerWhoAddNewName={setWorkerWhoAddNewName}
        setUpdateTable={setUpdateTable}
      />
    </div>
  );
};

export default ListOfNewWorkName;
