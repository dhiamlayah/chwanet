import Carousel from "react-bootstrap/Carousel";
import "../StyleDesign/images.css";
import { Images } from "../staticData/imagesExemple";

function CarouselExemples() {
  return (
    <Carousel data-bs-theme="dark">
      {Images.map((image) => {
        return (
          <Carousel.Item key={image.id}>
            <img
              src={image.url}
              className="w-100 d-block "
              alt={image.domain}
            />
            <Carousel.Caption>
              <h3>{image.domain}</h3>
              <p>{image.discreption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselExemples;
