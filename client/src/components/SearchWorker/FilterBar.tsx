import { useContext } from "react";
import { globalSearchComponent } from "../../pages/SearchWorker";
import ChooseDomain from "../ChooseDomain";
import ChooseState from "../ChooseState";
import ChooseDelegation from "../ChooseDelegation";

const FilterBar = () => {
  const queryParams = new URLSearchParams(location.search);
  const { domain, handleChange, state, delegation, search,setSearch,setSearchParams } =
    useContext(globalSearchComponent);
  return (
    <div className="sidebar  border border-right col-md-3 col-lg-2 mt-5">
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto  ">
        <h6 className="sidebar-heading fw-bold text-center justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
          <span>ابحث عن عامل </span>
        </h6>
        <div className="input-group flex-nowrap mt-3">
          <input
            type="text"
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value)
              queryParams.set('search', e.target.value);
              queryParams.set('page', '1');

              setSearchParams(queryParams)

            }}
            className="w-100  p-2 rounded-start border border-dark  text-end"
            placeholder="ابحث عن عامل"
          />
        </div>
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
            <ChooseDelegation
              state={state}
              delegation={delegation}
              handleChange={handleChange}
            />
          </li>
          {/* <button
              className="btn btn-outline-light p-1 w-25 m-2"
              onClick={() => specifecWorkersFromDB(1, 12)}
            >
              ابحث
            </button> */}
        </ul>
        <hr className="my-3" />
      </div>
    </div>
  );
};

export default FilterBar;
