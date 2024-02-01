import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Worker } from "../pages/SearchWorker";
import { Link } from "react-router-dom";
import { Placeholder } from "react-bootstrap";

function WorkerFound({ workers }: any) {
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
                  <Card.Title className="text-center">
                    {worker.firstName} {worker.lastName}{" "}
                  </Card.Title>
                  <Card.Text className="text-end">
                    <span className="fw-bold">هاتف: </span> {worker.phone}{" "}
                    <br />
                    <span className="fw-bold">مجال العمل: </span>{" "}
                    {worker.workName}
                  </Card.Text>
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
