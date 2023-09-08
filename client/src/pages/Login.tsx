import { useState } from "react";
import axios from "axios";
const Login = () => {
  interface Input {
    phone: null | string;
    password: null | string;
  }
  const [phone, setPhone] = useState<number>(),
        [password, setPassword] = useState<string>(""),
        [errors, setErrors] = useState<Input>({
      phone: null,
      password: null,
                       });


 
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const validate = (event: any, type: string) => {
    const newErrors = errors;
    if (event.target.value === "" || event.target.value === null) {
      if (type === "phone") {
        newErrors.phone = "phone required";
        setErrors(newErrors);
      } else {
        newErrors.password = "password required";
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

  const sendUserData =()=>{

  }

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
              <div className="alert alert-danger">{errors.phone}</div>
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
              <div className="alert alert-danger">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-outline-warning">
            سجل
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
