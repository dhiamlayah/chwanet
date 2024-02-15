import Carousel from "react-bootstrap/Carousel";
import "../StyleDesign/CarouselExemples.css";
import { phoneImages } from "../staticData/imagesExemple";
import { Link } from "react-router-dom";
import { createRef, useRef } from "react";

const CarouselForPhoneScreen = () => {
  const linkRefs = useRef<any>([]);
  return (
    <Carousel data-bs-theme="dark">
      {phoneImages.map((phoneImage,index) => {
          linkRefs.current[index] = createRef();
        return (
          <Carousel.Item key={phoneImage.id} interval={3000}>
            <div
              className="container "
              style={{
                height: "95vh",
                paddingTop: "32vh",
                backgroundColor: "beige",
              }}
            >
              <div className="row justify-content-center   ">
                <div
                  className="col-md-6  w-75 p-3  border border-dark  rounded-3 "
                  onClick={() => {
                    linkRefs.current[index].current.click();
                  }}
                  id="worksImages"
                >
                  <div className="text-center p-3 fs-7">
                    <img
                      src={phoneImage.url}
                      style={{ width: "128px", height: "128px" }}
                      alt={phoneImage.domain}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Carousel.Caption>
              <Link
                ref={linkRefs.current[index]}
                to={`/searchWorker?filter=null&page=1&domain=${phoneImage.sendTo}`}
                className="text-dark fs-2 fw-bold text-decoration-none"
              >
                {phoneImage.domain}
              </Link>
              <p >{phoneImage.discreption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselForPhoneScreen;
