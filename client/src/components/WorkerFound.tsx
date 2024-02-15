import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Worker } from "../pages/SearchWorker";
import { Link } from "react-router-dom";
import { Placeholder } from "react-bootstrap";
import StarsRating from "react-star-rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass1,
  faPersonDigging,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { globalSearchComponent } from "../pages/SearchWorker";
type Props = {
  workers: Worker[] | null;
};

function WorkerFound({ workers }: Props) {
  const { error, setError } = useContext(globalSearchComponent);

  console.log("workers ==========>", workers);

  const url: string | undefined = process.env.REACT_APP_port;
  return (
    <Row
      xs={2}
      sm={3}
      md={3}
      lg={4}
      xl={4}
      className="g-4 m-0 "
      style={{ minHeight: "60vh" }}
    >
      {workers && !error &&
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
      {!workers && !error  && (
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

      {workers?.length==0 && !error &&  <div className="d-lg-flex d-block justify-content-center w-100">
            <div>
                <h1 className="lead fw-bold opacity-75 pt-5 mt-2 text-center text-break"  >لم يتم العثور على أي عامل</h1>
                <p className="lead text-break text-center"> ساعدنا على تطوير هذا الموقع <br />إذا كنت تعرف عمالًا محترفين <br />فأخبرهم عنا لإنشاء منصة وسعة ومتنوعة </p>
             </div>
            <div>
              <img
                src="../images/noWorkerFound.png"
                style={{ width: "100%", height: "auto" }}
                alt="server down"
              />
            </div>
          </div>}

      {error  && (
          <div className="d-lg-flex d-block justify-content-center w-100">
            <div>
                <h1 className="lead fw-bold opacity-75 pt-5 mt-3 text-center text-break"  >فشل شيء ما فلسرفير منفضلك أعد تحميل الصفحة </h1>
                <div className="d-flex justify-content-center pt-3 "><button className="btn btn-dark text-center  opacity-75" onClick={()=>{
                        window.location.pathname = '/searchWorker';}}
                > تحميل الصفحة</button></div>
            </div>
            <div>
              <img
                src="../images/serverDown.png"
                style={{ width: "80%", height: "auto" }}
                alt="server down"
              />
            </div>
          </div>
          )}
    </Row>
  );
}

export default WorkerFound;
