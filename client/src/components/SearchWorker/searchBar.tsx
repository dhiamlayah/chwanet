import "../../StyleDesign/searchPage.css";
import { useContext, useState } from "react";
import { globalSearchComponent } from "../../pages/SearchWorker";
const SearchBar = () => {
  const queryParams = new URLSearchParams(location.search);
  const { numberOfWorkers, setSearchParams, setSortBy } = useContext(
    globalSearchComponent
  );
  return (
    <div className="container mt-5 text-center d-flex w-100">
      <div className="line line-dark w-25  "></div>
      <p style={{ width: "18rem" }}  >عامل محترف    <span>{numberOfWorkers} </span>  </p>
      <div className="line line-dark w-50  "></div>

     
      <div>
        <select
          style={{ backgroundColor: "rgb(0,0,0,0)", border: "0 " }}
          onChange={(e) => {
            setSortBy(e.target.value);
            queryParams.set("sortBy", e.target.value);
            queryParams.set("page","1");

            setSearchParams(queryParams);
          }}
        >
          <option value={"nothing"}>ترتيب حسب</option>
          <option value={"rate"}>الأفضل تقييم  </option>
          <option value={"length"}>الأكثر مقيمين </option>
        </select>
      </div>

      <div className="line line-dark  "></div>
    </div>
  );
};

export default SearchBar;
