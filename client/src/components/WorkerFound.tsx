import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Worker} from '../pages/SearchWorker'


 function WorkerFound({workers}:any) { 
  let size = {
    'xs':2,
    'sm':3, 
    'lg':4, 
  }
  if(workers){
    if(workers.length===1){
      size.lg=1
      size.sm=1
      size.xs=1
    }
    if(workers.length===2){
      size.lg=2
      size.sm=2
      size.xs=2
    }
    if(workers.length===3){
      size.lg=3
    }
  }
 

  return ( 
    <Row  xs={size.xs} sm={size.sm}  md={size.sm} lg={size.lg} xl={size.lg} className="g-4  p-5">
      {workers && workers.map((worker:Worker) =>{   
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
                <Button variant="outline-warning" className=' text-break  fw-bold'>إلق نظرة</Button>
              </Card.Body>
            </Card>
          </Col>
      )})}
    </Row>
  );
}

export default WorkerFound;