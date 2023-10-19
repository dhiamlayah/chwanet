import { useEffect , useState} from "react";
import ChooseStateAndDelegation from "../ChooseStateAndDelegation";

const UpdateStateAndDelegations = ({delegation,setState,state,setDelegation}:any) => {
  



  return (
    <div
      className="text-light text-center  py-5 w-75 "
      style={{ fontSize: "20px" }}
    >
      <ChooseStateAndDelegation
        state={state}
        userDelegation={delegation}
        setUserDelegation={setDelegation}
        setState={setState}
      />
 
    </div>
  );
};

export default UpdateStateAndDelegations;
