import { TunisiaStateAndDelegation } from "../staticData/stateAndDelegationsOfTunisia";
import { states, delegations } from "../methods/chooseStateAndDelegation";
import { useEffect, useState } from "react";

const ChooseStateAndDelegation = ({
  state,
  userDelegation,
  setState,
  setUserDelegation,
}: any) => {
  const stateAndDelegation = TunisiaStateAndDelegation;
  const allStates = states(stateAndDelegation);
  // const [state, setState] = useState<string>("");
  const [allDelegations, setAllDelegations] = useState<String[]>([]);
  // const [userDelegation, setUserDelegation] = useState<string>("");

  const handleChangeState = (event: any) => {
    setState(event.target.value);
  };
  const handleChangeDelegation = (event: any) => {
    setUserDelegation(event.target.value);
  };

  useEffect(() => {
    if (state !== "") {
      const newDelegations = delegations(state, stateAndDelegation);
      setAllDelegations(newDelegations);
    }
  }, [state]);

  return (
    <div className=" text-end  " id="states">
      {/*-----------For States--------------- */}
      <div id="state" className="text-end">
        <select
          className="text-end text-white "
          style={{ backgroundColor: "#ffffff4f" }}
          id="state"
          value={state}
          onChange={handleChangeState}
        >
          <option className="list-group-item text-white" value="">
            {" "}
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
        <label htmlFor="state" className="px-3 py-1">
          :ولاية
        </label>
      </div>

      {/*-----------For Delegations--------------- */}
      {state !== "" && (
        <div id="delegations" className="pt-2">
          <select
            className="text-end text-white "
            style={{ backgroundColor: "#ffffff4f" }}
            id="state"
            value={userDelegation}
            onChange={handleChangeDelegation}
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
          <label htmlFor="delegation" className="px-3 py-1">
            :معتمدية
          </label>
        </div>
      )}
    </div>
  );
};

export default ChooseStateAndDelegation;
