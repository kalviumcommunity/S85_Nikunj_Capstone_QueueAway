import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

function BusinessLogin() {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 pb-5">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={5}>
            <div
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '32px 24px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                margin: '0 auto',
                maxWidth: 400,
              }}
            >
              <h2 className="fw-bold mb-3">Business Login</h2>
              <BsPersonCircle size={56} className="mb-3" style={{ color: '#666' }} />
              <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control type="email" placeholder="Email address" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 fw-semibold mb-2"
                  style={{ borderRadius: 6 }}
                >
                  Log in
                </Button>
                <div>
                  <a href="#" className="text-decoration-none text-muted" style={{ fontSize: '1rem' }}>
                    Forgot Password?
                  </a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BusinessLogin;