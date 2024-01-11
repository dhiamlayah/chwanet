import { useState } from "react";
import AddImages from "../AddImages";
import AllWorkerPictures from "../allWorkerPictures";

const PicturesLife = () => {
  const [addPicture, setAddPicture] = useState<Boolean>(false);
  return (
    <div className="border border-secondary">
      {addPicture && <AddImages back={setAddPicture}/>}
      {!addPicture && (
        <>
          <div className="d-flex justify-content-center pt-5">
            <button
              className="btn btn-outline-dark "
              onClick={() => setAddPicture(true)}
            >
              + تحميل صور
            </button>
          </div>
          <hr className="mx-5 d-flex justify-content-center " />
          <AllWorkerPictures />
        </>
      )}
    </div>
  );
};

export default PicturesLife;
