import Carousel from "react-bootstrap/Carousel";
import "../StyleDesign/CarouselExemples.css";
import { Images } from "../staticData/imagesExemple";
import { Link } from "react-router-dom";

function CarouselExemples() {
  return (
    <Carousel data-bs-theme="dark"  >
      {Images.map((image) => {
        return (
          <Carousel.Item key={image.id} interval={3000}>
            <img
              src={image.url}
              style={{height:"98vh"}}
              className="w-100 d-block "
              alt={image.domain}
            />
            
            <Carousel.Caption>
              <Link to={`/searchWorker?filter=null&page=1&domain=${image.sendTo}`}  className=" fs-1 fw-bold text-secondary">{image.domain}</Link>
              <p className="fw-bold  fs-4">{image.discreption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselExemples;
