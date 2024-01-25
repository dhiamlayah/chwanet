import axios from "axios";
import {useContext, useEffect, useState } from "react";
import { globalComponents } from "./profileWorker/WorkerProfil";
import "../StyleDesign/workerComments.css";
import LodingPage from "../loading";

interface comment {
  _id: string;
  date: string;
  text: string;
  name: string;
}

interface Props {
  addNewComment:boolean
}

const ClientsComments = ({addNewComment}:Props) => {
  const { WorkerInformations ,user} = useContext(globalComponents);
  let key = 0; // key for the list
  const [comments, setComments] = useState<comment[]>([]);
  const [nothingFound, setNothingFound] = useState<string | null>(null);

  const url: string =
    process.env.REACT_APP_port + `/commentWorker/${WorkerInformations._id}`;
  const getComments = async () => {
    await axios
      .get(url)
      .then((res: any) => {
        setNothingFound(null)
        setComments(res.data);
      })
      .catch((error: any) => {
          if(error.response){
            setNothingFound(" لا يوجد أي تعليق حتى الان كن الأول وشاركنا ملاحظتك");
         }else{
           setNothingFound('لا يمكن الاتصال بالسرفر')
         }   
      });
  };

  useEffect(() => {
    getComments();
  }, [addNewComment]);
  
  useEffect(() => {
    getComments();
  }, []);


  return (
    <div style={{ backgroundColor: "#FCFDFF", minHeight: "30vh" }}>
        {comments.length===0 && !nothingFound &&
         <LodingPage/>
        }
         {comments.length>0  && (
          <ul className="list-group" id="allClientsComments">
            {comments.map((comment: any) => {
              key++;         
              const commaIndex = comment.date.indexOf(',') + 2
              const gmtIndex = comment.date.indexOf('GMT')
              const extractedSubstring = comment.date.substring(commaIndex, gmtIndex).trim();

              return (
                <li
                  className="list-group-item   text-dark lh-1"
                  key={comment._id + key}
                >
                  <p className="lh-1">
                    <span className="text-primary fw-bold px-1">
                      {comment.name}
                    </span>
                    : {extractedSubstring}
                    {user && user._id === comment._id._id && <span className="text-end text-danger ps-5" style={{cursor:'pointer'}}>حذف</span>}

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
              className="d-none d-sm-block"
              alt="nothing found"
            />
            <p className="pt-5 text-end fw-bold text-secondary mt-3">
             {nothingFound}
            </p>
          </div>
        )} 
     </div>
  );
};

export default ClientsComments;
