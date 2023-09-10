import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AnimatedPage from "../util/AnimatedPage";
import axios from "axios";
import { Link } from "react-router-dom";
const Login = () => {
  const url: string = process.env.REACT_APP_port + "/login";
  interface Input {
    phone: null | string;
    password: null | string;
  }
  const [phone, setPhone] = useState<number>(),
    [password, setPassword] = useState<string>(""),
    [errors, setErrors] = useState<Input>({
      phone: null,
      password: null,
    }),
    [submitErrors, setSubmitErrors] = useState<string | null>();


  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

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
          console.log(res);
          const headers = res.headers["token"];
          const user = res.data.user
          localStorage.setItem('User',user)
          localStorage.setItem("Token", headers);
          toast.success("تسجيل الدخول بنجاح");
          redirectUser();
        });
    } catch (err: any) {
      toast.error(err.response.data.message);
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
    const cheak = cheackInputs();
    if (!cheak) {
      return setSubmitErrors("يرجى استكمال البيانات ");
    }
    setSubmitErrors(null)
    await sendUserData();
  };
  const redirectUser = () => {
    setTimeout(() => {
      window.location.pathname = "/";
    }, 5000);
  };
  return (
      <div className="background2">
            <AnimatedPage>

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
              <input
                type="password"
                className="form-control  text-white fs-5 "
                id="password"
                style={{ backgroundColor: "#ffffff4f" }}
                value={password}
                onChange={(e) => handleChange(e, setPassword, "password")}
              />
              {errors.password && (
                <div className="text-danger p-1">* {errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-outline-warning mt-2"
              onClick={handleClick}
            >
              إرسال
            </button>
            {submitErrors && (
              <div className="alert alert-danger mt-2">{submitErrors}</div>
            )}
          </form>
          <div className="text-end fw-bold">
            <Link to="/register" className="text-light text-decoration-none ">لا املك حساب </Link>
          </div>
        </div>
        <ToastContainer />
        </AnimatedPage>

      </div>
  );
};

export default Login;
