import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function WorkerFound() {
  return (
    <Row  xs={2} sm={3}  md={3} lg={4} xl={5} className="g-4 p-5">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" className='h-100' src="https://i.pinimg.com/564x/19/6d/a5/196da5e3d4addcc30ce12d407662df81.jpg" />
            <Card.Body>
              <Card.Title>Card title </Card.Title>
              <Card.Text> 
                phone : 50939301  <br />
                workName: somthing
              </Card.Text>
              <Button variant="outline-warning" className=' text-break fw-bold'>إلق نظرة</Button>

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default WorkerFound;