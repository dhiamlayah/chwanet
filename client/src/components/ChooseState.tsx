import {states} from '../methods/chooseStateAndDelegation'
import { TunisiaStateAndDelegation } from "../staticData/stateAndDelegationsOfTunisia";
 const ChooseState = ({state,handleChange}:any) => {
    const allStates=states(TunisiaStateAndDelegation)
     return (    
     <div id="state" className="text-end">
      <select
        className="text-end text-white "
        style={{ backgroundColor: "#ffffff4f" }}
        id="state"
        value={state}
        onChange={(e)=>handleChange(e,"state")}

      >
        <option className="list-group-item text-white" value="">
         </option>
        {allStates.map((state: string) => {
          return (
            <option
              className="list-group-item text-dark"
              key={state}
              value={state}
            >
              {state}
            </option>
          );
        })}
      </select>
    </div>
    
    );
}
 
export default ChooseState;