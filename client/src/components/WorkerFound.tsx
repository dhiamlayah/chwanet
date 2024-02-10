import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Worker } from "../pages/SearchWorker";
import { Link } from "react-router-dom";
import { Placeholder } from "react-bootstrap";
import StarsRating from "react-star-rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDigging, faPhone } from "@fortawesome/free-solid-svg-icons";

type Props = {
  workers: Worker[] | null;
};

function WorkerFound({ workers }: Props) {
  const url: string | undefined = process.env.REACT_APP_port;
  return (
    <Row xs={2} sm={3} md={3} lg={4} xl={4} className="g-4 m-0 ">
      {workers &&
        workers.map((worker: Worker) => {
          if (worker.photo === null) return null;
          return (
            <Col key={worker._id}>
              <Card>
                {worker.photo && (
                  <Card.Img
                    variant="top"
                    className=" w-100   "
                    style={{ imageRendering: "pixelated", height: "13rem" }}
                    src={`${url}/userPicture/${worker._id}/${worker.photo.filename}`}
                  />
                )}
                <Card.Body>
                  {worker && worker.Rate && (
                    <StarsRating
                      style={{
                        style: {
                          fontSize: "60px",
                          marginTop: "-70px",
                          display: "flex",
                          flexDirection: "row-reverse",
                        },
                      }}
                      value={worker.Rate.rate / 5.0}
                      count={1}
                    />
                  )}
                  {worker && !worker.Rate && (
                    <StarsRating
                      style={{
                        style: {
                          fontSize: "60px",
                          marginTop: "-70px",
                          display: "flex",
                          flexDirection: "row-reverse",
                        },
                      }}
                      value={0}
                      count={1}
                    />
                  )}
                  <Card.Title
                    className="text-center"
                    style={{ marginTop: "-15px" }}
                  >
                    {worker.firstName} {worker.lastName}
                    <div className="d-flex justify-content-center">
                      <div className="line line-dark w-25   bg-secondary  "></div>
                    </div>
                  </Card.Title>
                    <div className="text-end pb-1">
                      <div className=" d-flex justify-content-end " style={{    lineBreak: 'anywhere',marginBottom:'-10px'}}>
                        <p>{worker.phone}</p>
                        <p className="fw-bold px-2 text-secondary">
                          <FontAwesomeIcon icon={faPhone} />{" "}
                        </p>
                      </div>
                      <div className="d-flex justify-content-end ">
                        <p>{worker.workName}</p>
                        <p className="fw-bold px-2 text-secondary">
                          <FontAwesomeIcon icon={faPersonDigging} />
                        </p>{" "}
                      </div>
                    </div>
                  <Link
                    to={`/profile/${worker._id}`}
                    className="btn btn-outline-warning"
                  >
                    Take a look
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      {!workers && (
        <>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "18rem", margin: "10px" }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="warning" xs={6} />
            </Card.Body>
          </Card>
        </>
      )}
    </Row>
  );
}

export default WorkerFound;
