import {  useEffect, useState } from "react";
import ChooseDomain from "../components/ChooseDomain";
import ChooseState from "../components/ChooseState";
import ChooseDelegation from "../components/ChooseDelegation";
 import axios from "axios";
import Pagination from "../util/Pagination";
 import { Link } from "react-router-dom";
import '../StyleDesign/searchPage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import WorkerFound from "../components/WorkerFound";
export interface Worker {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  workName: string;
  photo: any;
  picture: string;
}

const SearchWorker = () => {
  const [domain, setDomain] = useState(""),
    [state, setState] = useState(""),
    [delegation, setDelegation] = useState(""),
    [workers, setWorkers] = useState<Worker[] | null>(null),
    [finelworkers, setFinelWorkers] = useState<Worker[] | null>([]),
    [numberOfWorkers, setNumberOfWorkers] = useState<number>(0);

  const url: any = process.env.REACT_APP_port;

  const specifecWorkersFromDB = async (page: number, limit: number) => {
    await axios
      .post(url + `/getWorkers?page=${page}&limit=${limit}`, {
        state,
        delegation,
        domain,
      })
      .then((res) => {
        setNumberOfWorkers(res.data.numberOfWorkers);
        setWorkers(res.data.Workers);
      })
      .catch((err: any) => {
        console.log(
          "there are errors to get specifec worker from dataBase ",
          err.response.data
        );
      });
  };

  const getWorkerPicture = async (worker: any) => {
    try {
      await axios
        .get(url + "/userPicture/" + worker.photo.filename)
        .then((res) => {
          let workerWithPicture = { ...worker };
          workerWithPicture.picture = res.config.url;
          console.log("workerWithPicture", workerWithPicture);
          setFinelWorkers((prev: any) => [...prev, workerWithPicture]);
        });
    } catch (err) {
      console.log("there is an error to get imageUrl", err);
      let workerWithPicture = { ...worker };
      workerWithPicture.picture = "null";
      setFinelWorkers((prev: any) => [...prev, workerWithPicture]);

      return "we can't get user picture";
    }
  };

  const allWorkersFound = async () => {
    const newWorkers = workers;
    setFinelWorkers([]);
    if (newWorkers)
      newWorkers.map(async (worker: any) => {
        await getWorkerPicture(worker);
      });
  };

  const handleChange = (e: any, type: string) => {
    if (type === "workName") setDomain(e.target.value);
    if (type === "state") {
      setState(e.target.value);
      setDelegation("");
    }
    if (type === "delegation") setDelegation(e.target.value);
  };

  useEffect(() => {
    specifecWorkersFromDB(1, 12);
  }, []);

  useEffect(() => {
    allWorkersFound();
  }, [workers, setWorkers]);

  return (
    <div
      className="d-md-flex"
      style={{ backgroundColor: "beige", minHeight: "100vh" }}
    >
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
              <ChooseDelegation
                state={state}
                delegation={delegation}
                handleChange={handleChange}
              />
            </li>
            <Link
              to="/searchWorker?filter=true&page=1"
              className="btn btn-outline-light p-1 w-25 m-2"
              onClick={() => specifecWorkersFromDB(1, 12)}
            >
              ابحث
            </Link>
          </ul>
          <hr className="my-3" />
        </div>
      </div>
      <div className="mt-5 w-100">
      <div className="container mt-5 text-center d-flex w-100">
        <div className="line line-dark w-25 mt-3"></div>
        <div className="input-group flex-nowrap">

        <input type="text" className="w-100  p-2 rounded-start border border-dark  text-end" placeholder="ابحث عن عامل" />
        <span  className="input-group-text border border-dark  bg-warning" id="addon-wrapping"> <FontAwesomeIcon icon={faMagnifyingGlass} /></span>
        </div>
        <div className="line line-dark w-25 mt-3"></div>
       
      </div>

        <WorkerFound workers={finelworkers} />
        {numberOfWorkers !== 0 && (
          <Pagination
            numberPages={Math.ceil(numberOfWorkers / 12)}
            specifecWorkersFromDB={specifecWorkersFromDB}
          />
        )}
      </div>
    </div>
  );
};

export default SearchWorker;
