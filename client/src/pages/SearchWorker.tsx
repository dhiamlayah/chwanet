import { useEffect, useState, createContext } from "react";
import { useLocation,useSearchParams  } from "react-router-dom";

import axios from "axios";
import Pagination from "../util/Pagination";
import WorkerFound from "../components/WorkerFound";
import FilterBar from "../components/SearchWorker/FilterBar";
import SearchBar from "../components/SearchWorker/searchBar";

export interface Worker {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  workName: string;
  photo: any;
  Rate: {rate : number ,length:number} |null;
}

export const globalSearchComponent = createContext<any | undefined>(undefined);

const SearchWorker = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(location.search);

  const queryState=queryParams.get("state")
  const queryDomain =queryParams.get("domain") 
  const queryDelegation = queryParams.get("delegation") 
  const querySearch = queryParams.get("search") 
  const querySortBy= queryParams.get('sortBy')
  const [domain, setDomain] = useState<string>(()=>{ return queryDomain ? queryDomain: ""}),
        [state, setState] = useState<string>(()=>{ return queryState ? queryState: ""}),
        [delegation, setDelegation] = useState<string>(()=>{ return queryDelegation ? queryDelegation: ""}),
        [workers, setWorkers] = useState<Worker[] | null>(null),
        [numberOfWorkers, setNumberOfWorkers] = useState<number>(0),
        [search,setSearch]=useState<string>(()=>{ return querySearch ? querySearch: ""}),
        [sortBy,setSortBy]=useState<string>(()=>{ return querySortBy ? querySortBy: ""})

  const [error, setError] = useState<null | string>(null);
  const url: any = process.env.REACT_APP_port;

  const queryPage = Number(queryParams.get("page"));


  const specifecWorkersFromDB = async (page: number, limit: number) => {
    await axios
      .post(url + `/getWorkers?page=${page}&limit=${limit}&sortBy=${sortBy}`, {
        state,
        delegation,
        domain,
        search:search.trim()
      })
      .then((res) => {
        setNumberOfWorkers(res.data.numberOfWorkers);
        setWorkers(res.data.Workers);
      })
      .catch((error: any) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("لا يمكن الاتصال بالسرفر");
        }
      });
  };

  const handleChange = (e: any, type: string) => {
    if (type === "workName"){ 
      setDomain(e.target.value);
      queryParams.set('domain', e.target.value);
    }
    if (type === "state") {
      setState(e.target.value);
      setDelegation("");
      queryParams.set('state', e.target.value);
    }
    if (type === "delegation"){ 
      setDelegation(e.target.value);
      queryParams.set('delegation', e.target.value);

    }
    queryParams.set('page', '1');
    setSearchParams(queryParams)
  };



  useEffect(() => {
    console.log('querySortBy =======>',querySortBy)

    setWorkers(null)
    specifecWorkersFromDB(queryPage, 12);
  }, [state,delegation,domain,search,sortBy]);

  useEffect(() => {
     specifecWorkersFromDB(queryPage, 12);
  }, [queryPage]);

  return (
    <globalSearchComponent.Provider
      value={{ domain, handleChange, state, delegation, specifecWorkersFromDB,setSearchParams,search,setSearch,numberOfWorkers,setSortBy}}
    >
      <div
        className="d-md-flex"
        style={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}
      >
        <FilterBar />

        <div className="mt-5 w-100">
          <SearchBar />
          <WorkerFound workers={workers} />

          {numberOfWorkers !== 0 && (
            <Pagination
              numberPages={Math.ceil(numberOfWorkers / 12)}
            />
          )}
        </div>
      </div>
    </globalSearchComponent.Provider>
  );
};

export default SearchWorker;
