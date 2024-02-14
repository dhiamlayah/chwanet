import axios from "axios";
import React, { useState, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type LengthData = {
  lengthClients: number;
  lengthWorkNames: number;
  lengthWorkers: number;
};

const NumberUser = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lengthData, setLengthData] = useState<LengthData>({
    lengthClients: 0,
    lengthWorkNames: 0,
    lengthWorkers: 0,
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const url: string = process.env.REACT_APP_port + "/getWorkers/length"; //url to get current user

  const getLengthData = async () => {
    try {
      await axios.get(url).then((res) => {
        setLengthData(res.data)
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getLengthData();
  }, []);

  React.useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div
      className="d-flex justify-content-center align-items-center d-sm-block"
      style={{ backgroundColor: "lightsteelblue" }}
    >
      <div
        className="d-sm-flex justify-content-sm-evenly d-block py-5"
        style={{ minHeight: "60vh" }}
        ref={ref}
      >
        <div
          className="rounded-circle   d-flex justify-content-center align-items-center  m-5 "
          style={{ backgroundColor: "#607d8b", height: "35vh", width: "35vh" }}
        >
          <div className=" d-block">
            <div className="text-center">
              <img
                src="./images/home/users.png"
                className="p-2"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="descreptionImg"
              />
            </div>
            <h2
              className="text-center fw-bold "
              style={{ marginBottom: "-12px", color: "#333333" }}
            >
              زائر{" "}
            </h2>
            <div className="  text-center">
              {isVisible && (
                <CountUp
                  start={0}
                  end={lengthData.lengthClients}
                  duration={5}
                  className="fw-bold"
                  style={{
                    fontSize: "40px",
                    color: "#333333",
                    fontVariantNumeric: "oldstyle-nums",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className="rounded-circle   d-flex justify-content-center align-items-center  m-5 "
          style={{ backgroundColor: "#607d8b", height: "35vh", width: "35vh" }}
        >
          <div className=" d-block">
            <div className="text-center">
              <img
                src="./images/home/workers.png"
                className="p-2"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="descreptionImg"
              />
            </div>
            <h2
              className="text-center fw-bold "
              style={{ marginBottom: "-12px", color: "#333333" }}
            >
              عامل{" "}
            </h2>
            <div className="  text-center">
              {isVisible && (
                <CountUp
                  start={0}
                  end={lengthData.lengthWorkers}
                  duration={10}
                  className="fw-bold"
                  style={{
                    fontSize: "40px",
                    color: "#333333",
                    fontVariantNumeric: "oldstyle-nums",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className="rounded-circle   d-flex justify-content-center align-items-center  m-5 "
          style={{ backgroundColor: "#607d8b", height: "35vh", width: "35vh" }}
        >
          <div className=" d-block">
            <div className="text-center">
              <img
                src="./images/home/domains.png"
                className="p-2"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="descreptionImg"
              />
            </div>
            <h2
              className="text-center fw-bold "
              style={{ marginBottom: "-12px", color: "#333333" }}
            >
              وظيفة{" "}
            </h2>
            <div className="  text-center">
              {isVisible && (
                <CountUp
                  start={0}
                  end={lengthData.lengthWorkNames}
                  duration={10}
                  className="fw-bold"
                  style={{
                    fontSize: "40px",
                    color: "#333333",
                    fontVariantNumeric: "oldstyle-nums",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberUser;
