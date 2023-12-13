import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import StarsRating from "react-star-rate";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  setShowUpdateDiv: Function;
}

const RateWorker = ({ setShowUpdateDiv }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const url: string = process.env.REACT_APP_port + "/rateWorker";
  const param = useParams();
  const token = localStorage.getItem("Token");

  const sendRate = async () => {
    await axios
      .put(
        url,
        { workerId: param.id },
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      )
      .then((res: any) => {
        console.log(res.data);
        if (res.data == "successfuly") {
          toast.success("تم تقييم العمل بنجاح ");
        }
        redirectUser();
      })
      .catch((err: any) => {
        console.log("we cant rate worker", err);
        toast.error("نعتذر هناك خطب ما  ");
        redirectUser();
      });
  };
  const redirectUser = () => {
    return setTimeout(() => {
      setShowUpdateDiv(false);
      setError(null);
    }, 1000);
  };

  const handleClick = async () => {
    if (value === null) {
      return setError("من فظلك قم بتقييم العامل ");
    }
    if (!token) {
      return setError(
        " يؤسفنا إبلاغك بأنه يجب أن يكون لديك حساب قبل أن تقوم بتقييم العامل      "
      );
    }
    await sendRate();
  };

  const handleExit = () => {
    setShowUpdateDiv(false);
    setValue(null);
    setError(null);
  };

  return (
    <div>
      <ToastContainer />

      <h3 className="m-2 text-light" onClick={handleExit}>
        <button
          type="button"
          className="btn-close bg-warning  "
          aria-label="Close  "
        ></button>
      </h3>

      <div className="d-flex justify-content-center align-items-center">
        <StarsRating
          value={value ? value : 0}
          onChange={(value: any) => {
            setValue(value);
          }}
        />
        <h1 className="px-4 mt-2 text-light">{value}/5</h1>
      </div>

      <button
        type="button"
        className="btn btn-outline-warning m-2 mt-5 "
        onClick={handleClick}
      >
        تحديث
      </button>
      {error && (
        <div className="alert alert-danger text-end">
          <p>{error}</p>
          {!token && (
            <p>
              {" "}
              اضغط هنا لإنشاء حساب{" "}
              <Link
                to="/register"
                className="text-end px-2 text-decoration-none fw-bold"
              >
                إنشاء حساب
              </Link>
            </p>
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default RateWorker;
