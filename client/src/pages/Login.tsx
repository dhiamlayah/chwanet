import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Input {
  phone: null | string;
  password: null | string;
}

const Login = () => {
  const url: string = process.env.REACT_APP_port + "/login";
  const [see, setSee] = useState<boolean>(false),
    [wait, setWait] = useState(false), //boolean to wait for the response from server
    [phone, setPhone] = useState<number>(),
    [password, setPassword] = useState<string>(""),
    [submitErrors, setSubmitErrors] = useState<string | null>(),
    [errors, setErrors] = useState<Input>({
      phone: null,
      password: null,
    });

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  // send error message if any input is vide
  const validate = (event: any, type: string) => {
    const newErrors = errors;

    if (event.target.value === "" || event.target.value === null) {
      if (type === "phone") {
        newErrors.phone = "الهاتف مطلوب";
        setErrors(newErrors);
      } else {
        newErrors.password = "كلمة المرور مطلوبة ";
        setErrors(newErrors);
      }
    } else {
      if (type === "phone") {
        newErrors.phone = null;
        setErrors(newErrors);
      } else {
        newErrors.password = null;
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (event: any, setState: Function, type: string) => {
    validate(event, type);
    setState(event.target.value);
  };

  const sendUserData = async () => {
    try {
      await axios
        .post(url, {
          phone,
          password,
        })
        .then((res) => {
          setWait(false);
          const headers = res.headers["token"];
          const user : string = res.data.user;
          localStorage.setItem("User", user);
          localStorage.setItem("Token", headers);
          toast.success("تم  تسجيل الدخول بنجاح ، مرحبا بعودتك ");
          redirectUser(user);
        });
    } catch (err: any) {
      setWait(false);

      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("لا يمكن الاتصال بالسرفر، من فضلك أعد مرة أخرى ");
      }
    }
  };

  const cheackInputs = (): boolean => {
    if (phone === null || password === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleClick = async () => {
    const cheack = cheackInputs();
    if (!cheack) {
      return setSubmitErrors("يرجى استكمال جميع المعلومات ");
    }
    const number = Number(phone);
    if (!number) {
      return setSubmitErrors("رقم الهاتف خاطئ");
    } else if (number > 99999999 || number < 10000000) {
      return setSubmitErrors("رقم الهاتف يجب أن يتكون من 8 أرقام ");
    }
    setSubmitErrors(null);
    setWait(true);
    await sendUserData();
  };

  const redirectUser = (user:string) => {
    let path = "/";
    if (user === "Worker"){
      path="/profile/me"
    }
    setTimeout(() => {
      window.location.pathname = path;
    }, 2500);
  };
  return (
    <div className="background2">
      <div
        className=" mt-5 p-5"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        id="register"
      >
        <form className="text-white fw-medium" onSubmit={handleSubmit}>
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
              onChange={(e) => handleChange(e, setPhone, "phone")}
            />
            {errors.phone && (
              <div className="text-danger p-1">* {errors.phone}</div>
            )}
          </div>
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
                onChange={(e) => handleChange(e, setPassword, "password")}
              />
            </div>
            {errors.password && (
              <div className="text-danger p-1">* {errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-outline-warning mt-2"
            onClick={handleClick}
          >
            {!wait ? (
              "إرسال"
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
          {submitErrors && (
            <div className="alert alert-danger mt-2">{submitErrors}</div>
          )}
        </form>
        <div className="text-end fw-bold">
          <Link to="/register" className="text-light text-decoration-none ">
            لا املك حساب{" "}
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
