import "../../StyleDesign/workerComments.css";
import ClientsComments from "../ClientsComments";

type Props ={
  workerId : string ,
}

const WorkerComments = ({workerId}:Props) => {
  return (
    <div id="Comments">
      <ClientsComments />
      <div className="input-group text-end ">
        <button className="btn btn-outline-dark" type="button">
          إرسال
        </button>
        <input
          type="text"
          className=" border border-dark form-control "
          placeholder="اكتب تعليقك"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
  );
};

export default WorkerComments;
