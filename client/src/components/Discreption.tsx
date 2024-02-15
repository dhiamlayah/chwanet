import { Link } from "react-router-dom";
import "../StyleDesign/homePage.css";
const Description = () => {

  const userType = localStorage.getItem("User")


  console.log("userType",userType)
  return (
    <div
      className="p-5 d-flex  justify-content-around "
      style={{ minHeight: "90vh", backgroundColor: "whitesmoke" }}
    >
      <div>
        <img
          src="./images/home/descreption2.png"
          className="p-2 mt-5 d-lg-block d-none "
          style={{ width: "90%", height: "auto" }}
          alt="descreptionImg"
        />
      </div>
      <div className="descreption pt-5">
        <h1
          className="pt-5   text-center fw-bold "
          style={{ color: "cadetblue" }}
        >
          إنظم إلى موقعنا مجانا
        </h1>
        <p className="  text-center pt-3 fw-bold fs-5">
          مرحبًا بكم في موقعنا، حيث يجتمع كل ما يتعلق بأعمال المنزل! إذا كنت
          تتطلع إلى الانضمام إلى هذه المجموعة وتحسين هذا الموقع، يكفي أن تقوم
          بإنشاء حساب هنا. سيتم إضافة اسمك بفخر إلى قائمة الحرفيين ، وستساهم
          مشاركاتك في تثريت هذا الفضاء المفيد. نتطلع إلى مشاركتك وتألقك في جعل
          هذا الموقع أفضل وأكثر تنوعًا
        </p>
        <p className='text-end text-secondary'>!إذا كانت وظيفتك غير  موجودة في قائمة المهن, يمكنك إضافتهة بكل بساطة*</p>
        <div className="d-flex justify-content-center my-5">
        {!userType &&  <Link className="btn" to="/register" style={{ backgroundColor: "cadetblue" }}>
            إنشاء حساب{" "}
          </Link>}
          {userType==="Worker" &&  <Link className="btn  " to='/profile/me' style={{ backgroundColor: "cadetblue" }}>
          ملفك الشخصي
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default Description;
