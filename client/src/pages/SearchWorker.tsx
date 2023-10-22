import { useState } from "react";
import ChooseDomain from "../components/ChooseDomain";
import ChooseState from "../components/ChooseState";
import ChooseDelegation from "../components/ChooseDelegation";
import WorkerFound from "../components/WorkerFound";

const SearchWorker = () => {
    const [domain,setDomain]=useState(''),
          [state,setState]=useState(''),
          [delegation,setDelegation]=useState('')

    const handleChange=(e:any,type:string)=>{
        if(type==='workName')setDomain(e.target.value)
        if(type==="state")setState(e.target.value)
        if(type==="delegation")setDelegation(e.target.value)

    }

  return (
    <div className="d-md-flex">
      <div className="sidebar  border border-right col-md-3 col-lg-2 mt-5">
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto  ">
          <h6 className="sidebar-heading fw-bold text-center justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>ابحث عن عامل </span>
          </h6>
          <hr className="my-3" />
          <ul
            className="nav flex-column text-end "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <li className="nav-item text-end fw-bold mx-2 mt-3 ">
              <ChooseDomain workName={domain} handleChange={handleChange} />
            </li>
            <li className="nav-item text-end fw-bold mx-2 ">
              <p className="text-white"> : الولاية </p>
              <ChooseState state={state} handleChange={handleChange} />
            </li>
            <li className="nav-item text-end fw-bold mx-2 my-3">
              <p className="text-white"> : المعتمدية </p>
              <ChooseDelegation state={state} delegation={delegation} handleChange={handleChange}/>
            </li>
          </ul>
          <hr className="my-3" />
        </div>
      </div>
      <div className="mt-5">
        <WorkerFound/>  
       </div>
    </div>

    
  );
};

export default SearchWorker;
