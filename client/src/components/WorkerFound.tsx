import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Worker} from '../pages/SearchWorker'


 function WorkerFound({workers}:any) { 
    var compteur=-1
    return ( 
    <Row  xs={2} sm={3}  md={3} lg={4} xl={4} className="g-4 p-5">
      {workers && workers.map((worker:Worker) =>{   
            compteur++
            return (
            <Col key={worker._id}> 
            <Card>
              {worker.picture && <Card.Img variant="top" className=' w-100  ' style={{imageRendering:'pixelated',height:'13rem'}}  src={worker.picture} />}
              <Card.Body>
                <Card.Title  className='text-center'>{worker.firstName} {worker.lastName} </Card.Title>
                <Card.Text  className='text-end' > 
                  <span className='fw-bold'>هاتف: </span> {worker.phone}  <br />
                  <span className='fw-bold'>مجال العمل: </span> {worker.workName}
                </Card.Text>
                <Button variant="outline-warning" className=' text-break  fw-bold'>إلق نظرة</Button>
              </Card.Body>
            </Card>
          </Col>
      )})}
    </Row>
  );
}

export default WorkerFound;