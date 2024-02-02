import "../../StyleDesign/searchPage.css";
import { useContext } from "react";
import { globalSearchComponent } from "../../pages/SearchWorker";
const SearchBar = () => {
  const { numberOfWorkers } = useContext(globalSearchComponent);
  return (
    <div className="container mt-5 text-center d-flex w-100">
      <div className="line line-dark w-25  "></div>
      <p style={{ width: "18rem" }}>{numberOfWorkers} worker found</p>
      <div className="line line-dark w-50  "></div>

      <div className="dropdown">
        <p
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ width: "4rem" ,cursor:"pointer"}}
        >
          sort by
        </p>
        <ul
          className="dropdown-menu "
         >
          <li>must comment</li>
          <li>must rate</li>
        </ul>
      </div>

      <div className="line line-dark  "></div>
    </div>
  );
};

export default SearchBar;
