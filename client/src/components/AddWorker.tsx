import { Link } from "react-router-dom";
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
        <h2 className="pt-5   text-center fw-bold " style={{ color: "teal" }}>
          ابحث عن أي عامل في كامل تونس
        </h2>
        <p className="  text-center pt-3 fw-bold fs-5">
          من بناء المنازل الى تصميم الديكور، من تركيب الكهرباء إلى أعمال
          الدهانات، وغيرهم من الاختصاصات المتنوعة نقدم لك خدمات ذات جودة عالية
          تلبي احتياجاتك بكل دقة واهتمام. مع شبكة واسعة من الحرفيين المؤهلين،
          يمكنك الاطمئنان إلى أنك ستجد الخبير المثالي للمهمة التي ترغب في
          تنفيذها.
        </p>
        <div className="d-flex justify-content-center my-5">
          <Link
            to='/searchWorker?filter=null&page=1'
            className="btn  text-light"
            style={{ backgroundColor: "teal" }}
          >
            انقر للبحث
          </Link>
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
