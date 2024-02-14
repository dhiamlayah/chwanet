const OurObjectif = () => {
  return (
    <div className=" py-5" style={{ backgroundColor: "#a2717170" }}>
      <h1 className="text-center text-secondary">أهدافنا </h1>
      <hr />
      <div className="d-block py-5 text-center d-lg-flex">
        <div className="bg-secondary m-3 rounded-3" style={{minHeight:"30vh" ,minWidth:"30%"}}>
          <h3 className="mt-3 fw-bold">منصة شاملة لخدمات المنزل</h3>
          <p className="text-light fs-5 p-3">
              نحن نهدف إلى تقديم مكان واحد يضم
            جميع الخدمات المنزلية، بدءًا من البناء والكهرباء وصولاً إلى الدهانات
            والخدمات الأخرى ذات الصلة، لتلبية احتياجات مالكي المنازل بشكل شامل.
          </p>
        </div>
         <div className="bg-secondary m-3 rounded-3" style={{minHeight:"30vh" ,minWidth:"30%"}}>
          <h3 className="mt-3 fw-bold">تعزيز الفرص للمتخصصين</h3>
          <p className="text-light fs-5 p-3">
            نسعى إلى توفير فرص عمل للحرفيين والمحترفين في
            مختلف المجالات المنزلية، مما يعزز فرص العمل ويسهم في تحسين جودة
            الخدمات المقدمة.
          </p>
        </div>
        <div className="bg-secondary m-3 rounded-3" style={{minHeight:"30vh" ,minWidth:"30%"}}>
          <h3 className="mt-3 fw-bold">تسهيل عملية الاختيار والتقييم</h3>
          <p className="text-light fs-5 p-3">
              نحن نسعى لتيسير عملية اختيار مقدمي
            الخدمات عبر منصة توفر معلومات شاملة وتقييمات من المستخدمين السابقين،
            مما يساعد المستهلكين في اتخاذ قرارات مستنيرة عند اختيار مقدمي
            الخدمات لديهم.
          </p>
        </div>
      </div>
      <hr />

    </div>
  );
};

export default OurObjectif;
