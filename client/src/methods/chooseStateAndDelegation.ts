import {StateAndDelegation} from "../staticData/stateAndDelegationsOfTunisia"

export function states<String> (TunisiaStateAndDelegation : StateAndDelegation){
    let states : string[] = []
    for(let i in TunisiaStateAndDelegation){
        states.push(i)
    }
    return states
} 

export function delegations <String> (state : string , TunisiaStateAndDelegation :StateAndDelegation){
    return TunisiaStateAndDelegation[state]
}