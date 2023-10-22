import {delegations} from '../methods/chooseStateAndDelegation'
import { TunisiaStateAndDelegation } from "../staticData/stateAndDelegationsOfTunisia";

const ChooseDelegation = ({state,handleChange,delegation}:any) => {
    if(state!==""){
        const allDelegations=delegations(state,TunisiaStateAndDelegation)
        return ( 
            <div id="delegations" >
              <select
                className="text-end text-white "
                style={{ backgroundColor: "#ffffff4f" }}
                id="state"
                value={delegation}
                onChange={(e)=>handleChange(e,'delegation')}
              >
                <option className="list-group-item text-white" value=""></option>
                {allDelegations.length > 0 &&
                  allDelegations.map((delegation: any) => {
                    return (
                      <option
                        className="list-group-item text-dark"
                        key={delegation}
                        value={delegation}
                      >
                        {delegation}
                      </option>
                    );
                  })}
              </select>
            </div>
         );
    }
    return null
   
}
 
export default ChooseDelegation;