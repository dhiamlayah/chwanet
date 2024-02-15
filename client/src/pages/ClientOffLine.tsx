import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClientOffLine = () => {
    return (
        <div
        className="position-relative"
        style={{ backgroundColor: "#EEEEEE", height: "100vh" }}
      >
        <div className="d-flex position-absolute top-50 start-50 translate-middle ">
             <h1 className="lead fw-bold opacity-75 pt-5 mt-3 text-center text-break">
            أنت غير متصل بالشبكة، يرجى التحقق من الإنترنت الخاص بك
            <FontAwesomeIcon icon={faWifi} />

            </h1>

         </div>
      </div>

      );
}
 
export default ClientOffLine;