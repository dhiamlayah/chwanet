import "../StyleDesign/register.css";

const Register = () => {
  return (
    <div className="background">
      <div
        className=" p-5"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        id="register"
      >
        <form className="text-white fw-medium">

          {/* ---------full Name ------------------------- */}
          <div className="mb-3 text-white text-end d-flex ">
          <input
              type="text"
              className="form-control text-white fs-5"
              id="lastName"
              aria-describedby="emailHelp"
              style={{ backgroundColor: "#ffffff4f", width: "40%" ,marginLeft:'4%'}}
            />
            <label htmlFor="lastName" className="form-label mx-2 " >
              :اللقب
            </label>

            <input
              type="text"
              className="form-control text-white fs-5"
              id="name"
              aria-describedby="emailHelp"
              style={{ backgroundColor: "#ffffff4f", width: "40%" ,marginLeft:'4%'}}
            />
            <label htmlFor="name" className="form-label mx-2 ">
              :اسم
            </label>
          </div>
 
          
          {/*----------phone number -----------------------*/}
          <div className="mb-3 text-white text-end">
            <label htmlFor="tlph" className="form-label ">
              رقم الهاتف
            </label>
            <input
              type="tel"
              className="form-control text-white fs-5"
              id="tlph"
              aria-describedby="emailHelp"
              style={{ backgroundColor: "#ffffff4f" }}
            />
          </div>

          
          {/*----------password-------------------------- */}
          <div className="mb-3 text-end">
            <label htmlFor="password" className="form-label ">
              كلمة المرور
            </label>
            <input
              type="password"
              className="form-control  text-white fs-5 "
              id="password"
              style={{ backgroundColor: "#ffffff4f" }}
            />
            <div id="emailHelp" className="form-text text-danger">
              يجب أن تكون كلمة المرور الخاصة بك أطول من 8 أحرف
            </div>
          </div>

         
          {/*----------possition in the platform---------- */}
          <div className="mb-3 text-end">
            <p>: اختر موقعك في هذه المنصة </p>
            <label htmlFor="possition" className="px-2">
              عامل
            </label>
            <input type="radio" value="worker" />
            <br />
            <label htmlFor="possition" className="px-2">
              زائر
            </label>
            <input type="radio" value="client" />
          </div>




          {/*----------are you sur ---------------- */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              تحقق
            </label>
          </div>

          
          <button type="submit" className="btn btn-outline-warning">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
