import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Worker} from '../pages/SearchWorker'
import { Link } from 'react-router-dom';


 function WorkerFound({workers}:any) { 
  console.log('workers to the show',workers)


 

  return ( 
    <Row  xs={2} sm={3}  md={3} lg={4} xl={4} className="g-4 m-0 p-5">
      {workers && workers.map((worker:Worker) =>{   
              console.log(workers)

           return (
            <Col key={worker._id}  > 
            <Card>
              {worker.picture && <Card.Img variant="top" className=' w-100   ' style={{imageRendering:'pixelated',height:'13rem'}}  src={worker.picture} />}
              <Card.Body>
                <Card.Title  className='text-center'>{worker.firstName} {worker.lastName} </Card.Title>
                <Card.Text  className='text-end' > 
                  <span className='fw-bold'>هاتف: </span> {worker.phone}  <br />
                  <span className='fw-bold'>مجال العمل: </span> {worker.workName}
                </Card.Text>
                <Link to={`/profile/${worker._id}`} className='btn btn-outline-warning'>Take a look</Link>
              </Card.Body>
            </Card>
          </Col>
      )})}
    </Row>
  );
}

export default WorkerFound;