import React, { useState, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const NumberUser = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

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
          className="rounded-circle border border-primary  d-flex justify-content-center align-items-center  m-5 "
          style={{ height: "35vh", width: "35vh" }}
        >
          <div className=" d-block">
            <div>
              <img
                src="./images/home/users.png"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="descreptionImg"
              />
            </div>
            <div className="  text-center">
                {isVisible && (
                  <CountUp start={0} end={400} duration={10}  />
                )}
            </div>
          </div>
        </div>
        <div
          className="rounded-circle border border-primary  d-flex justify-content-center align-items-center  m-5 "
          style={{ height: "35vh", width: "35vh" }}
        >
          <div className=" d-block">
            <div>
              <img
                src="./images/home/workers.png"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="descreptionImg"
              />
            </div>
            <div className="  text-center">
                {isVisible && (
                  <CountUp start={0} end={400} duration={10}  />
                )}
            </div>
          </div>
        </div>
        <div
          className="rounded-circle border border-primary  d-flex justify-content-center align-items-center  m-5 "
          style={{ height: "35vh", width: "35vh" }}
        >
          <div className=" d-block">
            <div>
              <img
                src="./images/home/domains.png"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="descreptionImg"
              />
            </div>
            <div className="  text-center">
                {isVisible && (
                  <CountUp start={0} end={400} duration={10}  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberUser;
