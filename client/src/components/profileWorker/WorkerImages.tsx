import { useContext, useEffect, useRef, useState } from "react";
import { globalComponents } from "./WorkerProfil";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcceptNewImag from "../boxMessages/AcceptNewImage";

const WorkerImages = () => {
  const inputImg = useRef<any>(null);
  const inputImg2 = useRef<any>(null);
  const { WorkerInformations, isMe } = useContext(globalComponents);
  const imgPDPUrl =
    process.env.REACT_APP_port +
    `/userPicture/${WorkerInformations._id}/${WorkerInformations.photo.filename}`;
  const backgroundImgUrl =
    process.env.REACT_APP_port +
    `/userPicture/${WorkerInformations.backgroundImage.filename}`;

  const [userPhoto, setUserPhoto] = useState<any>("/images/profil.jpg");
  const [backgroundImage, setBackgroundImage] =useState<any>("/images/profil.jpg");
  const [userFile, setUserFile] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

 
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      setUserFile(file);
      setOpen(true);
      const imagesUploded = (
        window.URL ? URL : window.webkitURL
      ).createObjectURL(file);
      setUserPhoto(imagesUploded);
    }
  };
  const onUplodeImage = () => {
    if (inputImg.current) {
      inputImg.current.click();
    }
  };



  const handleChangeFile2 = (event: any) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      setUserFile(file);
      setOpen2(true);
      const imagesUploded = (
        window.URL ? URL : window.webkitURL
      ).createObjectURL(file);
      setBackgroundImage(imagesUploded);
    }
  };
  const onUplodeImage2 = () => {
    if (inputImg2.current) {
      inputImg2.current.click();
    }
  };

  useEffect(() => {
    if (WorkerInformations.photo) {
      setUserPhoto(imgPDPUrl);
    }
    if(WorkerInformations.backgroundImage){
      setBackgroundImage(backgroundImgUrl);
    }
  }, []);

  return (
    <div>
      <div
        className="z-8 position-absolute text-end"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        id="couvertImg"
      >
        {" "}
        {isMe && (
          <FontAwesomeIcon
            onClick={() => {
              onUplodeImage2();
            }}
            className="pt-3 pe-2 text-end "
            data-bs-toggle="tooltip"
            style={{ cursor: "pointer" }}
            size="2xl"
            icon={faPenToSquare}
          />
        )}
      </div>
    
      <div className="z-5 position-absolute">
        <div
          className="z-8 position-absolute"
          style={{ backgroundImage: `url('${userPhoto}')` }}
          id="pdp"
        >
          {" "}
          {isMe && (
            <FontAwesomeIcon
              onClick={() => {
                onUplodeImage();
              }}
              size="xl"
              style={{ cursor: "pointer" }}
              icon={faPenToSquare}
            />
          )}
        </div>
      </div>
      <input
        className="d-none"
        type="file"
        ref={inputImg}
        onChange={handleChangeFile}
        accept="image/*"
      />

      <input
        className="d-none"
        type="file"
        ref={inputImg2}
        onChange={handleChangeFile2}
        accept="image/*"
      />
      <AcceptNewImag
        setOpen={setOpen}
        open={open}
        setUserPhoto={setUserPhoto}
        imgPDPUrl={imgPDPUrl}
        setUserFile={setUserFile}
        userFile={userFile}
        path='profilePicture'
      />
      <AcceptNewImag
        setOpen={setOpen2}
        open={open2}
        setUserPhoto={setBackgroundImage}
        imgPDPUrl={backgroundImgUrl}
        setUserFile={setUserFile}
        userFile={userFile}
        path='profileBackgroudPicture'
      />
    </div>
  );
};

export default WorkerImages;
