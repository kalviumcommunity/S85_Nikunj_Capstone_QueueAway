import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

// Demo data (simulate backend)
const demoData = {
  hairstudio: {
    name: 'Hair Studio',
    address: '123 Main St.',
    waitTime: '15 mins',
  },
  electroniccenter: {
    name: 'Electronic Center',
    address: '456 Elm St.',
    waitTime: '10 mins',
  },
  beautysalon: {
    name: 'Beauty Salon',
    address: '789 Oak Ave.',
    waitTime: '20 mins',
  },
  massagespa: {
    name: 'Massage Spa',
    address: '101 Pine Road',
    waitTime: '12 mins',
  },
};

function ShopDetails() {
  const { shopId } = useParams();
  const shop = demoData[shopId];

  if (!shop) {
    return (
      <div style={{ minHeight: '60vh' }} className="d-flex align-items-center justify-content-center">
        <h2>Shop not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 pb-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={7}>
            <h2 className="fw-bold text-center mb-1">{shop.name}</h2>
            <div className="text-center text-muted mb-4" style={{ fontSize: '1.1rem' }}>{shop.address}</div>
            <div
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                margin: '0 auto',
                maxWidth: 500,
              }}
            >
              <div
                style={{
                  background: '#f5f5fa',
                  borderRadius: 8,
                  height: 90,
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Placeholder for image */}
                <svg width="60" height="40" viewBox="0 0 60 40">
                  <polyline points="5,35 20,15 35,30 45,20 55,35" fill="none" stroke="#aaa" strokeWidth="3" />
                  <rect x="10" y="25" width="10" height="10" fill="#aaa" />
                </svg>
              </div>
              <Row className="mb-3">
                <Col className="text-start fw-semibold">Wait Time</Col>
                <Col className="text-end fw-semibold">{shop.waitTime}</Col>
              </Row>
              <div className="fw-semibold mb-2 text-start">Booking Details</div>
              <Form>
                <Form.Group className="mb-3 text-start" controlId="formDate">
                  <Form.Label className="mb-1 fw-semibold">Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Label className="mb-1 fw-semibold text-start w-100">Time</Form.Label>
                <div className="d-flex gap-2 mb-3">
                  <Button variant="light" style={{ border: '1px solid #bbb', minWidth: 90 }}>10:00AM</Button>
                  <Button variant="light" style={{ border: '1px solid #bbb', minWidth: 90 }}>11:00AM</Button>
                  <Button variant="light" style={{ border: '1px solid #bbb', minWidth: 90 }}>12:00PM</Button>
                </div>
                <Button type="submit" variant="dark" className="w-100 fw-semibold" style={{ borderRadius: 8 }}>
                  Book Now
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShopDetails;