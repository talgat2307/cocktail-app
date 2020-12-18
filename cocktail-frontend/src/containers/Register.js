import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FacebookLogin from '../components/FacebookLogin/FacebookLogin';

const Register = () => {

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='text-center pb-4'>Sign Up</h2>
            <div className='text-center'>
              <FacebookLogin/>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;