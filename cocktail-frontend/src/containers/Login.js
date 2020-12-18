import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FacebookLogin from '../components/FacebookLogin/FacebookLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='text-center pb-4'>Login</h2>
            <div className='text-center'>
              <FacebookLogin/>
            </div>
            <div className='text-center mt-5'>
              <Link to={'/register'} > Not yet registered? Sign Up</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;