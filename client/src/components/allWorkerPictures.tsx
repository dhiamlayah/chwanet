import { useEffect, useContext, useState } from "react";
import AnimatedPage from "../util/AnimatedPage";
import axios from "axios";
import { globalComponents } from "./profileWorker/WorkerProfil";
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
  const [show, setShow] = useState<string | null>(null);
  const getPicturesFromServer = async () => {
    await axios
      .get(
        url + `/workerPictures/${WorkerInformations._id}?startFrom=0&endIn=10`
      )
      .then((res) => {
        console.log("response", res.data);
        setPicturesLength(res.data.length);
        setPictures(res.data.pictures);
      })
      .catch((err: any) => {
        console.log("can't get pictures :", err);
      });
  };
  useEffect(() => {
    getPicturesFromServer();
  });
  return (
    <AnimatedPage>
      <div className="d-flex justify-content-center align-items-center">
        <picture
          className=" d-flex justify-content-center pt-2 "
          style={{ minHeight: "50vh", flexWrap: "wrap" }}
        >
          {pictures &&
            pictures.map((picture) => {
              return (
                <div className="d-grid">
                  <img
                    src={`http://localhost:8000/userPicture/${WorkerInformations._id}/${picture.picture.filename}`}
                    style={{
                      maxWidth: "32vh",
                      maxHeight: "32vh",
                      boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={() => setShow(picture.picture.filename)}
                    className={show===picture.picture.filename ?"d-none": "rounded float-start m-2 border border-secondary"}
                    alt={`${picture.picture.filename} photo`}
                  />
                  {show && show === picture.picture.filename && (
                    <div className="d-flex justify-content-center align-items-center mx-5 border border-primary ">
                      <hr className="mx-5 d-flex justify-content-center mt-2  d-lg-none" />
                      <div>
                        <hr className="mx-5 d-flex justify-content-center " />
                        <p>maùlze ùmlaùzeml aùmleùam lzeùmaleùmlazùemlazùelù</p>
                        <img
                          src={`http://localhost:8000/userPicture/${WorkerInformations._id}/${picture.picture.filename}`}
                          style={{
                            width: "450px",
                            height: "300px",
                            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
                          }}
                          className="rounded float-start  border border-secondary "
                          alt={`${picture.picture.filename} photo`}
                        />
                      </div>
                      <hr className="mx-5 d-flex justify-content-center mt-2 d-lg-none " />
                    </div>
                  )}
                </div>
              );
            })}
        </picture>
      </div>
    </AnimatedPage>
  );
};

export default AllWorkerPictures;
