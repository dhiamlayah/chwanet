import { useContext, useEffect, useRef, useState } from "react";
import { globalComponents } from "./WorkerProfil";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcceptNewImag from "../boxMessages/AcceptNewImage";

const WorkerImages = () => {
  const inputImg = useRef<any>(null);
  const [userPhoto, setUserPhoto] = useState<any>("/images/profil.jpg");
  const [userFile, setUserFile] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  console.log("userFile==========>", userFile);
  console.log("userPhoto=========>", userPhoto);

 

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

  const { WorkerInformations, isMe } = useContext(globalComponents);
  const imgPDPUrl = process.env.REACT_APP_port + `/userPicture/${WorkerInformations._id}/${WorkerInformations.photo.filename}` 
    
  useEffect(() => {
    if (WorkerInformations.photo) {
      setUserPhoto(imgPDPUrl);
    }
  }, []);

  const chooseImg = () => {
    const imgUrl = `url('/images/home/picture1.jpg')`;
    return imgUrl;
  };

  return (
    <div>
      <div
        className="z-8 position-absolute text-end"
        style={{ backgroundImage: chooseImg() }}
        id="couvertImg"
      >
        {" "}
        {isMe && (
          <FontAwesomeIcon
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

      <AcceptNewImag
        setOpen={setOpen}
        open={open}
        setUserPhoto={setUserPhoto}
        imgPDPUrl={imgPDPUrl}
        setUserFile={setUserFile}
        userFile={userFile}
      />
    </div>
  );
};

export default WorkerImages;
