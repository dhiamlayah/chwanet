import { useState } from "react";
import { Link } from "react-router-dom";
import "../StyleDesign/register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChooseStateAndDelegation from "../components/ChooseStateAndDelegation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Register = () => {
  const url: string = process.env.REACT_APP_port + "/register";

  const [firstName, setFirstName] = useState<string>(""),
    [lastName, setLastName] = useState<string>(""),
    [phone, setPhone] = useState<number>(),
    [password, setPassword] = useState<string>(""),
    [possition, setPossition] = useState<string>(""),
    [state, setState] = useState<string>(""),
    [delegation, setDelegation] = useState<string>(""),
    [cheakBox, setCheakBox] = useState<Boolean>(false),
    [wait, setWait] = useState(false),
    [errors, setErrors] = useState<string | null>(),
    [see, setSee] = useState<boolean>(false);
  const handleChange = (event: any, setState: Function) => {
    setState(event.target.value);
  };
  const sendUserData = async () => {
    try {
      await axios
        .post(url, {
          firstName,
          lastName,
          phone,
          possition,
          state,
          password,
          delegation,
        })
        .then((res) => {
          const headers = res.headers["token"];
          const user = res.data.user;
          localStorage.setItem("Token", headers);
          localStorage.setItem("User", user);
          toast.success("تم إنشاؤه بنجاح");
          redirectUser(user);
        });
    } catch (error: any) {
      setWait(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("لا يمكن الاتصال بالسرفر");
      }
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const cheackInputs = () => {
    if (firstName === "") {
      return false;
    } else if (lastName === "") {
      return false;
    } else if (password === "") {
      return false;
    } else if (phone === null) {
      return false;
    } else if (state === "") {
      return false;
    } else if (delegation === "") {
      return false;
    } else if (possition === "") {
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    const cheack = cheackInputs();
    if (!cheack) {
      return setErrors("يرجى استكمال جميع المعلومات");
    } else if (cheakBox === false) {
      return setErrors("تحقق من فضلك");
    }
    const number = Number(phone);
    if (!number) {
      return setErrors("رقم الهاتف خاطئ");
    }
    setErrors(null);
    setWait(true);
    await sendUserData();
  };

  const redirectUser = (user: string) => {
    let path = "/";
    if (user === "Worker") {
      path = "/register/info";
    }
    return setTimeout(() => {
      window.location.pathname = path;
    }, 5000);
  };

  return (
    <div className="background">
      {/* <AnimatedPage> */}
      <div
        className=" p-5"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        id="register"
      >
        <form className="text-white fw-medium" onSubmit={handleSubmit}>
          {/* ---------full Name ------------------------- */}
          <div className="mb-3 text-white text-end d-flex ">
            <input
              type="text"
              className="form-control text-white fs-5"
              id="lastName"
              aria-describedby="emailHelp"
              style={{
                backgroundColor: "#ffffff4f",
                width: "40%",
                marginLeft: "4%",
              }}
              value={lastName}
              onChange={(e) => handleChange(e, setLastName)}
            />
            <label htmlFor="lastName" className="form-label mx-2 ">
              :اللقب
            </label>
            <input
              type="text"
              className="form-control text-white fs-5"
              id="name"
              aria-describedby="emailHelp"
              style={{
                backgroundColor: "#ffffff4f",
                width: "40%",
                marginLeft: "4%",
              }}
              value={firstName}
              onChange={(e) => handleChange(e, setFirstName)}
            />
            <label htmlFor="name" className="form-label mx-2 ">
              :اسم
            </label>
          </div>
          {/* ----------phone number ----------------------- */}
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
              onChange={(e) => handleChange(e, setPhone)}
            />
          </div>
          {/*----------password-------------------------- */}
          <div className="mb-3 text-end">
            <label htmlFor="password" className="form-label ">
              كلمة المرور
            </label>
            <div className="input-group mb-3">
              <span
                className="input-group-text bg-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => setSee((prev) => !prev)}
                id="basic-addon1"
              >
                {!see && <FontAwesomeIcon icon={faEye} />}
                {see && <FontAwesomeIcon icon={faEyeSlash} />}
              </span>

              <input
                type={!see ? "password" : "text"}
                className="form-control  text-white fs-5 "
                id="password"
                style={{ backgroundColor: "#ffffff4f" }}
                value={password}
                onChange={(e) => handleChange(e, setPassword)}
              />
            </div>

            {password.length < 8 && password !== "" && (
              <div id="emailHelp" className="form-text text-danger">
                يجب أن تكون كلمة المرور الخاصة بك أطول من 8 أحرف
              </div>
            )}
          </div>
          {/*----------possition in the platform---------- */}
          <div className="mb-3 text-end">
            <p>: اختر موقعك في هذه المنصة </p>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="success-outlined"
              value="worker"
              onClick={() => {
                setPossition("worker");
              }}
            />
            <label
              className="btn btn-outline-secondary px-5"
              htmlFor="success-outlined"
            >
              عامل
            </label>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="danger-outlined"
              value="client"
              onClick={() => {
                setPossition("client");
              }}
            />
            <label
              className="btn btn-outline-secondary px-5"
              htmlFor="danger-outlined"
            >
              زائر
            </label>
          </div>
          {/*----------state and delagation---------- */}
          <div className="mb-3 text-end ">
            <p>:اختر موقعك الجغرافي</p>
            <ChooseStateAndDelegation
              state={state}
              userDelegation={delegation}
              setState={setState}
              setUserDelegation={setDelegation}
            />
          </div>
          {/*----------are you sur ---------------- */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onClick={() => {
                setCheakBox(!cheakBox);
              }}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              تحقق
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-warning"
            onClick={handleClick}
          >
            {!wait ? (
              "سجل"
            ) : (
              <>
                <span role="status">انتظر...</span>
                <span
                  className="spinner-grow spinner-grow-sm"
                  aria-hidden="true"
                ></span>
              </>
            )}
          </button>
          {errors && <div className="alert alert-danger">{errors}</div>}
        </form>
        <div className="text-end fw-bold">
          <Link to="/login" className="text-light text-decoration-none ">
            {" "}
            املك حساب{" "}
          </Link>
        </div>
        <ToastContainer />
      </div>
      {/* </AnimatedPage> */}
    </div>
  );
};

export default Register;
