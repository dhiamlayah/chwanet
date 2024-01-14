import "../StyleDesign/homePage.css";

const AddWorker = () => {
  return (
    <div
      className="d-block  py-5 d-lg-flex justify-content-center"
      style={{ backgroundColor: "#DEDEDE", minHeight: "90vh" }}
    >
      <img
        src="./images/home/img2.png"
        className="d-lg-none d-block "
        style={{ width: "100%", height: "auto" }}

        alt="team"
      />
       <div className="descreption pt-5 px-5">
        <h2 className="pt-5   text-center fw-bold "  style={{color:"teal"}}>
        ابحث عن أي عمل في كامل تونس 
        </h2>
        <p className="  text-center pt-3 fw-bold fs-5">
          مرحبًا بكم في موقعنا، حيث يجتمع كل ما يتعلق بأعمال المنزل! إذا كنت
          تتطلع إلى الانضمام إلى هذه الجماعة وتحسين هذا الموقع، يكفي أن تقوم
          بإنشاء حساب هنا. سيتم إضافة اسمك بفخر إلى قائمة المشاركين، وستساهم
          مشاركاتك في تثريت هذا الفضاء المفيد. نتطلع إلى مشاركتك وتألقك في جعل
          هذا الموقع أفضل وأكثر تنوعًا
        </p>
        <div className="d-flex justify-content-center my-5">
              <button className="btn  text-light" style={{backgroundColor:'teal' }}  >
                + تحميل صور
              </button>
            </div>
      </div>
      <img
        src="./images/home/img2.png"
        className=" d-lg-block d-none"
        style={{ maxWidth: "100%", height: "auto" }}
        alt="team"
      />
    </div>
  );
};

export default AddWorker;
//cadetblue
