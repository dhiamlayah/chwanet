import "../StyleDesign/homePage.css";
const Description = () => {
  return (
    <div
      className="p-5 d-flex  justify-content-around "
      style={{ height: "90vh", backgroundColor: "whitesmoke" }}
    >
      <div>
        <img
          src="./images/home/descreptionImg2.jpeg"
          className="p-2 mt-5 d-lg-block d-none "
          style={{ width: "500px", height: "348px" }}
          alt="descreptionImg"
        />
      </div>{" "}
      <div className="descreption">
        <h1 className="pt-5  text-sm-end text-center fw-bold text-dark">
          TITRE
        </h1>
        <p className=" text-sm-end text-center pt-3 fw-bold fs-5">
          مرحبًا بكم في موقعنا، حيث يجتمع كل ما يتعلق بأعمال المنزل! إذا كنت
          تتطلع إلى الانضمام إلى هذه الجماعة وتحسين هذا الموقع، يكفي أن تقوم
          بإنشاء حساب هنا. سيتم إضافة اسمك بفخر إلى قائمة المشاركين، وستساهم
          مشاركاتك في تثريت هذا الفضاء المفيد. نتطلع إلى مشاركتك وتألقك في جعل
          هذا الموقع أفضل وأكثر تنوعًا
        </p>
        <button className="btn btn-warning position-relative mt-5 px-4  ">
          get start
        </button>
      </div>
    </div>
  );
};

export default Description;
