import AnimatedPage from "../util/AnimatedPage";

const AllWorkerPictures = () => {
  return (
    <AnimatedPage>

    <div className="d-flex justify-content-center align-items-center">

      <picture
        className=" d-flex justify-content-center pt-2 "
        style={{ minHeight: "50vh", flexWrap: "wrap" }}
      >
        <img
          src="../../images/home/descreptionImg2.jpeg"
          style={{
            width: "200px",
            height: "200px",
            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.)",
          }}
          className="rounded float-start m-2 border border-secondary"
          alt="..."
        />

        <img
          src="../../images/home/descreptionImg.jpeg"
          style={{
            width: "200px",
            height: "200px",
            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
          className="rounded float-start m-2 border border-secondary"
          alt="..."
        />

        <img
          src="../../images/home/descreptionImg3.jpeg"
          className="rounded float-start m-2 border border-secondary "
          style={{
            width: "200px",
            height: "200px",
            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
          alt="descreptionImg"
        />

        <img
          src="../../images/home/descreptionImg3.jpeg"
          className="rounded float-start m-2 border border-secondary "
          style={{
            width: "200px",
            height: "200px",
            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
          alt="descreptionImg"
        />
        <img
          src="../../images/home/descreptionImg3.jpeg"
          className="rounded float-start m-2 border border-secondary "
          style={{
            width: "200px",
            height: "200px",
            boxShadow: " 5px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
          alt="descreptionImg"
        />
      </picture>
    </div>
    </AnimatedPage>

  );
};

export default AllWorkerPictures;
