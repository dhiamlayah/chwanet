import "../../StyleDesign/workerComments.css";
import ClientsComments from "../ClientsComments";
import SendComments from "../SendComment";

const WorkerComments = () => {
  return (
    <div id="Comments"  >
      <ClientsComments />
      <SendComments/>
    </div>
  );
};

export default WorkerComments;
