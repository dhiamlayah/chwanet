import "../StyleDesign/homePage.css";
const AboutProject = () => {
  return (
    <div
      className="py-5 px-2    d-lg-flex d-block  justify-content-arround w-100 "
      style={{ minHeight: "90vh", backgroundColor: "#FAF6F1" }}
    >
      <div className="descreption pt-5 mx-5">
        <h1
          className="pt-5   text-center fw-bold "
          style={{ color: "#6FAFDA" }}
        >
          شوانط
        </h1>
        <p className="  text-end pt-3 fw-bold fs-5">
          منصتنا هي الأولى من نوعها في تونس، حيث تجمع بين العملاء والحرفيين في
          بيئة افتراضية تسهل التواصل والتعاقد بينهم. يتيح للحرفيين إنشاء ملفات
          شخصية تعريفية تبرز مهاراتهم وخبراتهم، بينما يمكن للعملاء استعراض هذه
          الملفات واختيار الحرفي الذي يناسب احتياجاتهم بناءً على تقييمات
          المستخدمين السابقين ومهارات الحرفيين
        </p>
        <p className="  text-end   fw-bold fs-5">
          هدفنا هو توفير بيئة آمنة وموثوقةو دعم الحرفيين في بناء مشاريعهم وزيادة
          فرص العمل لديهم
        </p>
   
      </div>
      <div className="d-flex justify-content-end">
        <img
          src="./images/aboutUs/6.png"
          className=" mt-5   "
          style={{ width: "100%", height: "auto" }}
          alt="descreptionImg"
        />
      </div>
    </div>
  );
};

export default AboutProject;
