import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { globalComponents } from "./profileWorker/WorkerProfil";

const ClientsComments = () => {
  const { WorkerInformations } = useContext(globalComponents);
  const [comments, setComments] = useState<any>(null);
  const url: string =
    process.env.REACT_APP_port + `/commentWorker/${WorkerInformations._id}`;
  const getComments = async () => {
    await axios
      .get(url)
      .then((res: any) => {
        console.log("all comments ", res.data);
        setComments(res.data);
      })
      .catch((error: any) => {
        console.log("we cant get worker comments ", error);
      });
  };

  useEffect(() => {
    getComments();
  }, []);
  console.log("all comments",comments)

  return (
    <div>
      {comments && (
        <ul className="list-group">
          {comments.map((comment: any) => {
           return  <li className="list-group-item disabled text-dark lh-1">
              <p className="lh-1">
                <span className="text-primary fw-bold px-1">mohamed salem</span>{" "}
                : 25/07/2024
              </p>
              <p className="lh-1  text-secondary" style={{ marginTop: "-5px" }}>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis temporibus voluptate fugiat quibusdam vitae facilis
                quae enim alias veniam? Eius excepturi eveniet molestiae
                nesciunt veniam in facilis, at sunt mollitia?
              </p>
            </li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default ClientsComments;
