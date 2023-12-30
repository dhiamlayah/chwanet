import axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import { globalComponents } from "./profileWorker/WorkerProfil";
import "../StyleDesign/workerComments.css";
import LodingPage from "../loading";

interface comment {
  _id: string;
  date: string;
  text: string;
  name: string;
}

const ClientsComments = () => {
  const { WorkerInformations ,user} = useContext(globalComponents);
  let key = 0; // key for the list
  const [comments, setComments] = useState<comment[] | null>(null);
  const [nothingFound, setNothingFound] = useState<string | null>(null);
  const url: string =
    process.env.REACT_APP_port + `/commentWorker/${WorkerInformations._id}`;
  const getComments = async () => {
    await axios
      .get(url)
      .then((res: any) => {
        setComments(res.data);
      })
      .catch((error: any) => {
        console.log("we cant get worker comments ", error);
        setComments(null);
        setNothingFound("nothing found");
      });
  };

  useEffect(() => {
    getComments();
  }, []);


  return (
    <div style={{ backgroundColor: "#FCFDFF", minHeight: "30vh" }}>
      <Suspense fallback={<LodingPage />}>
        {comments && (
          <ul className="list-group" id="allClientsComments">
            {comments.map((comment: any) => {
              key++;
              console.log('*********')
              console.log('user id =======>',user._id)
              console.log('comment id =======>',comment._id._id)
              console.log('comment id ', comment._id._id===user._id)
              console.log('*********')
            
              return (
                <li
                  className="list-group-item disabled text-dark lh-1"
                  key={comment._id + key}
                >
                  <p className="lh-1">
                    <span className="text-primary fw-bold px-1">
                      {comment.name}
                    </span>
                    : {comment.date}
                    {user._id === comment._id._id && <span className="text-end text-danger ps-5">حذف</span>}

                  </p>
                  <p
                    className="lh-1  text-secondary"
                    style={{ marginTop: "-5px" }}
                  >
                    {comment.text}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
        {nothingFound && (
          <div
            className="d-flex text-end"
            style={{ justifyContent: "space-around" }}
          >
            <img
              src="../../images/nothingFound.png"
              style={{ width: "350px", height: "196px" }}
              alt="nothing found"
            />
            <p className="pt-5 text-end fw-bold text-secondary mt-3">
              لا يوجد أي تعليق حتى الان
              <br />. كن الأول وشاركنا ملاحظتك
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ClientsComments;
