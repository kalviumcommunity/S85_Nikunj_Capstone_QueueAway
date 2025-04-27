import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Demo data for user's queues
const myQueues = [
  {
    name: 'Hair Studio',
    address: '123 Main St.',
    position: 5,
    waitTime: '15 mins',
  },
  {
    name: 'City Electronics',
    address: '456 Elm St.',
    position: 8,
    waitTime: '25 mins',
  },
  {
    name: 'Beauty Salon',
    address: '789 Oak Ave.',
    position: 2,
    waitTime: '5 mins',
  },
  {
    name: 'Massage Spa',
    address: '101 Pine Rd.',
    position: 3,
    waitTime: '10 mins',
  },
];

function MyQueues() {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 pb-5">
      <Container className="text-center">
        <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem' }}>My Queues</h1>
        <div className="mb-4 text-muted" style={{ fontSize: '1.15rem' }}>
          View and manage your queues below
        </div>
        <Row className="justify-content-center g-3">
          {myQueues.map((queue, idx) => (
            <Col xs={12} md={7} key={idx} className="mx-auto">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 28px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  marginBottom: '8px',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#222' }}>
                    {queue.name}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.98rem' }}>
                    {queue.address}
                  </div>
                </div>
                <div
                  style={{
                    background: '#222',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '6px 18px',
                    minWidth: 120,
                    textAlign: 'right',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.98rem' }}>
                    Position: {queue.position}
                  </div>
                  <div style={{ fontSize: '0.93rem' }}>
                    Wait Time: {queue.waitTime}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MyQueues;