import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">أُووبس!</span>  الصفحة غير موجودة.

          </p>
          <p className="lead">الصفحة التي تبحث عنها غير موجودة.</p>
          <Link to='/' className="btn btn-warning">
          عُد إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
