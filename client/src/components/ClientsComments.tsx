import axios from "axios";
import {useContext, useEffect, useState } from "react";
import { globalComponents } from "./profileWorker/WorkerProfil";
import "../StyleDesign/workerComments.css";
import LodingPage from "../loading";
import StarsRating from "react-star-rate";

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
  const [clientsComment, setClientComment] = useState<comment[]>([]);
  const [nothingFound, setNothingFound] = useState<string | null>(null);

  const url: string =
    process.env.REACT_APP_port + `/commentWorker/${WorkerInformations._id}`;
  const getComments = async () => {
    await axios
      .get(url)
      .then((res: any) => {
        setNothingFound(null)
        setClientComment(res.data);
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

  console.log('client comment', clientsComment)


  return (
    <div style={{ backgroundColor: "#FCFDFF", minHeight: "30vh" }}>
        {clientsComment.length===0 && !nothingFound &&
         <LodingPage/>
        }
         {clientsComment.length>0  && (
          <ul className="list-group" id="allClientsComments">
            {clientsComment.map((clientComment: any) => {
              const commaIndex = clientComment.Comment.date.indexOf(',') + 2
              const gmtIndex = clientComment.Comment.date.indexOf('GMT')
              const extractedSubstring = clientComment.Comment.date.substring(commaIndex, gmtIndex).trim();

              return (
                <li
                  className="list-group-item   text-dark lh-1"
                  key={clientComment._id}
                >
                  <p className="lh-1">
                    <span className="text-primary fw-bold px-1">
                      {clientComment.firstName}{clientComment.lastName}
                    </span>
                    : {extractedSubstring}
                    {user && user._id === clientComment._id && <span className="text-end text-danger ps-5" style={{cursor:'pointer'}}>حذف</span>}

                  </p>
                  {clientComment.Rate  &&

                   <StarsRating
                  style={{ style: { fontSize: "25px" ,marginTop:'-15px',padding:'0 50px 20px 15px',color:'black'} }}
                  value={clientComment.Rate }
                  />}
                  <p
                    className="lh-1 text-center text-secondary"
                    style={{marginTop: "-5px",whiteSpace: "pre-line"}}
                  >
                    {clientComment.Comment.text}
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
