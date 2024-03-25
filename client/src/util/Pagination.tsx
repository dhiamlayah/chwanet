import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { globalSearchComponent } from "../pages/SearchWorker";

interface Props {
  numberPages: number;
 }

const Pagination = ({ numberPages }: Props) => {
  const { setSearchParams } = useContext(globalSearchComponent);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let keyForRunders = 0; //just a variable for put a key in the runder
  let currentPage = 1;
  const queryPage = queryParams.get("page");
  if (queryPage) {
    currentPage = parseInt(queryPage);
  }

  //this function return a list contain the pages you can choose and the number 0 in the list mean space between pages
  const paginationStyle = () => {
    var pages: number[] = [];
    if (numberPages <= 6) {
      for (let i = 1; i <= numberPages; i++) {
        pages.push(i);
      }
      return pages;
    } else if (currentPage <= 2) {
      return [1, 2, 3, 0, 0, numberPages];
    } else if (currentPage >= numberPages - 1) {
      return [1, 0, 0, numberPages - 2, numberPages - 1, numberPages];
    } else {
      return [
        1,
        0,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        0,
        numberPages,
      ];
    }
  };

  const handleClick = (numberPage:string) => {
    queryParams.set("page", numberPage);
    console.log("queryParams",queryParams)
    setSearchParams(queryParams);
  };

  const pages = paginationStyle();
  return (
    <nav className="py-2">
      <ul className="pagination  justify-content-center">
        {pages.length > 0 &&
          pages.map((page) => {
            keyForRunders++;
            if (page !== 0)
              return (
                <li className="page-item  mt-2" key={keyForRunders}>
                  <button
                    
                    onClick={()=>handleClick(page.toString())}
                    className={
                      currentPage == page
                        ? " btn btn-dark mx-1 px-4"
                        : " btn btn-outline-dark mx-1 px-4"
                    }
                  >
                    {page}
                  </button>
                </li>
              );
            else
              return (
                <li className="page-item" key={keyForRunders}>
                  <p>......</p>
                </li>
              );
          })}
      </ul>
    </nav>
  );
};

export default Pagination;
