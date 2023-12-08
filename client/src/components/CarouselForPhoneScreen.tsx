import Carousel from "react-bootstrap/Carousel";
import "../StyleDesign/CarouselExemples.css";
import { phoneImages } from "../staticData/imagesExemple";
 
const CarouselForPhoneScreen = () => {
  return (
    <Carousel data-bs-theme="dark">
      {phoneImages.map((phoneImage) => {
        return (
          <Carousel.Item key={phoneImage.id} interval={1113000}>
            <div
              className="container "
              style={{ height: "95vh", paddingTop: "32vh",backgroundColor:'beige' }}
            >
              <div className="row justify-content-center   ">
                <div className="col-md-6  w-75 p-3  border border-dark  rounded-3 " id="worksImages" >
                  <div className="text-center p-3 fs-7">
                    <img
                    src={phoneImage.url}
                    style={{width:"128px",height:'128px'}}
                    alt={phoneImage.domain}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Carousel.Caption>
              <h3>{phoneImage.domain}</h3>
              <p>{phoneImage.discreption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselForPhoneScreen;
