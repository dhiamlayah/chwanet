import { useEffect, useContext, useState } from "react";
import AnimatedPage from "../util/AnimatedPage";
import axios from "axios";
import { globalComponents } from "./profileWorker/WorkerProfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
  const { WorkerInformations } = useContext(globalComponents);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [picturesLength, setPicturesLength] = useState<number>(0);
  const [show, setShow] = useState<Picture | null>(null);
  const [curseur,setCurseur]=useState({
    left:'pointer',
    right:'no-drop'
  })
  const [addMoreNb,setAddMoreNb]=useState<number>(1) //how many we click to add more to call server for more pictures
  const getPicturesFromServer = async (startFrom: number, endIn: number) => {
    await axios
      .get(
        url +
          `/workerPictures/${WorkerInformations._id}?startFrom=${startFrom}&endIn=${endIn}`
      )
      .then((res) => {
        console.log("response", res.data);
        setPicturesLength(res.data.length);
        setPictures((prev) => {
          return [...prev, ...res.data.pictures];
        });
        console.log("picture", pictures);
      })
      .catch((err: any) => {
        console.log("can't get pictures :", err);
      });
  };
  const nextShow = (picture: Picture) => {
    const index = pictures.indexOf(picture);
    if (index === pictures.length - 1) return setCurseur({left:'pointer',right:'no-drop'});
    setCurseur({right:'pointer',left:'pointer'})
    return setShow(pictures[index + 1]);
  };
  const prevShow = (picture: Picture) => {
    const index = pictures.indexOf(picture);
    if (index === 0) return setCurseur({right:"pointer",left:'no-drop'});
    setCurseur({right:'pointer',left:'pointer'})
    return setShow(pictures[index - 1]);
  };

  const callServerForMore = ()=>{
    const startFrom= addMoreNb*10
    const endIn=(addMoreNb+1)*10
    getPicturesFromServer(startFrom, endIn)
    setAddMoreNb(endIn/10)
  }
  useEffect(() => {
    getPicturesFromServer(0, 10);
  }, []);

  return (
    <AnimatedPage>
      <div className="d-block">
        {show && (
          <div className="mb-3 d-flex align-items-lg-end align-items-center  ">
            <button
              className="text-secondary border border-secondary ms-2"
              onClick={() => prevShow(show)}
              style={{ cursor: `${curseur.left}` }}
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <div>
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
                <div>
                  <hr className="mx-5 d-flex justify-content-center " />
                  <p className="text-center">هذي نهرت إلي مشيت السوسة مئة مرة مئة مرة مئة مرة مئة مرة مئة مر ة عة مئة مرة مئة مرة مئة مرلك أزل ململومل </p>
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
                            cursor:'pointer',
                            maxWidth: "15vh",
                            height: "auto",
                            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                          }
                        : {
                          cursor:'pointer',

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
       {picturesLength && addMoreNb*10<picturesLength &&
        <div className=" d-flex justify-content-center align-items-center my-2">
          <button
            className="btn btn-info "
            onClick={() => callServerForMore()}
          >
            {" "}
            see more{" "}
          </button>
        </div>}
      </div>
    </AnimatedPage>
  );
};

export default AllWorkerPictures;
