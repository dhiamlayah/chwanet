import { useEffect, useContext, useState } from "react";
import AnimatedPage from "../util/AnimatedPage";
import axios from "axios";
import { globalComponents } from "./profileWorker/WorkerProfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import LodingPage from "../loading";
import DeleteImage from "./boxMessages/DeleteImage";
type Picture = {
  descreption: string;
  picture: {
    destination: string;
    filename: string;
  };
  date: string;
};
const AllWorkerPictures = () => {
  const url: string | undefined = process.env.REACT_APP_port;
  const { WorkerInformations,isMe } = useContext(globalComponents);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [fileNameToDelete,setFileNameToDelete]=useState<null|string>(null)
  const [picturesLength, setPicturesLength] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState<Picture | null>(null);
  const [open,setOpen]=useState<boolean>(false)
  const [curseur, setCurseur] = useState({
    left: "pointer",
    right: "no-drop",
  });
  const [addMoreNb, setAddMoreNb] = useState<number>(1); //how many we click to add more to call server for more pictures
  const getPicturesFromServer = async (startFrom: number, endIn: number) => {
    await axios
      .get(
        url + `/workerPictures/${WorkerInformations._id}?startFrom=${startFrom}&endIn=${endIn}`
      )
      .then((res) => {
        setError(null);
        setPicturesLength(res.data.length);
        setPictures((prev) => {
          return [...prev, ...res.data.pictures];
        });
      })
      .catch((error: any) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("لا يمكن الاتصال بالسرفر");
        }
      });
  };
  const nextShow = (picture: Picture) => {
    const index = pictures.indexOf(picture);
    if (index === pictures.length - 1)
      return setCurseur({ left: "pointer", right: "no-drop" });
    setCurseur({ right: "pointer", left: "pointer" });
    return setShow(pictures[index + 1]);
  };
  const prevShow = (picture: Picture) => {
    const index = pictures.indexOf(picture);
    if (index === 0) return setCurseur({ right: "pointer", left: "no-drop" });
    setCurseur({ right: "pointer", left: "pointer" });
    return setShow(pictures[index - 1]);
  };

  const callServerForMore = () => {
    const startFrom = addMoreNb * 10;
    const endIn = (addMoreNb + 1) * 10;
    getPicturesFromServer(startFrom, endIn);
    setAddMoreNb(endIn / 10);
  };
  useEffect(() => {
    getPicturesFromServer(0, 10);
  },[]);


  console.log("images",pictures)
  console.log("length",picturesLength)

  return (
    <AnimatedPage>
      <div className="d-block" style={{ minHeight: "30vh" }}>
      {pictures.length===0 && !error &&
         <LodingPage/>
        }
        {show && (
          <div className="mb-3 d-flex align-items-lg-end align-items-center  w-100 ">
            
            <button
              className="text-secondary border border-secondary ms-2"
              onClick={() => prevShow(show)}
              style={{ cursor: `${curseur.left}` }}
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <div className="w-100">
          { isMe &&   <p
                className="text-start fw-bold fs-5"
                onClick={() => {
                  setFileNameToDelete(show.picture.filename)
                  setOpen(true)
                }}
                style={{ marginBottom: "-20px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faTrash} style={{color: "#9c0707"}} />           
             </p>}
              <p
                className="text-end fw-bold fs-5"
                onClick={() => setShow(null)}
                style={{ marginBottom: "-20px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </p>
              <p
                className="text-center text-secondary"
                style={{ marginBottom: "-20px" }}
              >
                {show.date}
              </p>
             
              <div className="d-flex justify-content-center align-items-lg-end align-items-center mx-5 ">
                <div >
                  <hr className="mx-5 d-flex justify-content-center " />
                  {show.descreption!==null  &&  <p className="text-center text-break ">
                           {show.descreption}
                  </p>}
                  <img
                    src={`${url}/userPicture/${WorkerInformations._id}/${show.picture.filename}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                    }}
                    className="rounded float-start  border border-secondary "
                    alt={`${show.picture.filename} photo`}
                  />
                </div>
              </div>
            </div>
            <button
              className="text-secondary border border-secondary me-2"
              onClick={() => nextShow(show)}
              style={{ cursor: `${curseur.right}` }}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        )}

        <picture
          className=" d-flex justify-content-center pt-2 "
          style={{ flexWrap: "wrap" }}
        >
          {pictures &&
            pictures.map((picture) => {
              return (
                <div className="" key={picture.picture.filename}>
                  <img
                    src={`${url}/userPicture/${WorkerInformations._id}/${picture.picture.filename}`}
                    style={
                      show
                        ? {
                            cursor: "pointer",
                            maxWidth: "15vh",
                            height: "auto",
                            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                          }
                        : {
                            cursor: "pointer",

                            maxWidth: "32vh",
                            height: "auto",
                            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                          }
                    }
                    onClick={() => setShow(picture)}
                    className={
                      show === picture
                        ? "rounded float-start m-2 border border-secondary border border-danger"
                        : "rounded float-start m-2 border border-secondary"
                    }
                    alt={`${picture.picture.filename} photo`}
                  />
                </div>
              );
            })}
        </picture>


        {error && (
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
             {error}
            </p>
          </div>
        )} 

        {picturesLength > 0 && addMoreNb * 10 < picturesLength && (
          <div className=" d-flex justify-content-center align-items-center my-2">
            <button
              className="btn btn-info "
              onClick={() => callServerForMore()}
            >
              {" "}
              see more{" "}
            </button>
          </div>
        )}
      </div>
      <DeleteImage open={open} setOpen={setOpen} NoPictureRest={setError} fileNameToDelete={fileNameToDelete} setShow={setShow} pictures={pictures}setPictures={setPictures} setFileNameToDelete={setFileNameToDelete}  />
    </AnimatedPage>
  );
};

export default AllWorkerPictures;
