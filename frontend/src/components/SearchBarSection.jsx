import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ selectedPosition, setSelectedPosition }) {
  useMapEvents({
    click(e) {
      setSelectedPosition(e.latlng);
    },
  });

  return selectedPosition ? <Marker position={selectedPosition} /> : null;
}

function MapController({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function SearchBarSection() {
  const [selectedPosition, setSelectedPosition] = useState({ lat: 28.6139, lng: 77.2090 });
  const [locationInput, setLocationInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const typingTimeout = useRef(null);

  // Geocode when user types location
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      if (value.trim().length === 0) return;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newCenter = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setMapCenter(newCenter);
        setSelectedPosition(newCenter);
      }
    }, 700);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle Find Shops button
  const handleFindShops = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    // Example: Call your backend API with searchInput and selectedPosition
    // Replace the URL with your real endpoint
    try {
      const res = await fetch(
        `/api/shops/search?query=${encodeURIComponent(searchInput)}&lat=${selectedPosition.lat}&lng=${selectedPosition.lng}`
      );
      const data = await res.json();
      setResults(data.shops || []);
    } catch (err) {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Container>
        <Row className="justify-content-center" style={{ marginTop: '60px' }}>
          <Col xs={12} md={8} lg={7}>
            <div className="text-center mb-4">
              <h1 className="fw-bold" style={{ fontSize: '2.5rem' }}>Queue Away</h1>
              <p className="text-muted" style={{ fontSize: '1.15rem' }}>
                Discover and join queues at your favourite shops, salons and service providers.
              </p>
            </div>
            <Form
              className="d-flex flex-wrap gap-2 justify-content-center align-items-center mb-4 shadow-sm p-3 bg-white rounded"
              style={{ borderRadius: 12 }}
              onSubmit={handleFindShops}
            >
              <Form.Control
                type="text"
                placeholder="Search for salon, spa, clinics..."
                style={{ maxWidth: 260, minWidth: 180 }}
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <Form.Control
                type="text"
                placeholder="Location"
                value={locationInput}
                onChange={handleLocationChange}
                style={{ maxWidth: 180, minWidth: 120 }}
              />
              <Button variant="outline-secondary" className="d-flex align-items-center" type="button">
                <FaFilter className="me-2" />
                Filters
              </Button>
              <Button variant="dark" type="submit">
                {loading ? <Spinner animation="border" size="sm" /> : 'Find Shops'}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div style={{
              height: 380,
              width: '100%',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              background: '#fff'
            }}>
              <MapContainer
                center={mapCenter}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController center={mapCenter} />
                <LocationMarker selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition} />
                {/* Show shop markers */}
                {results.map((shop, idx) => (
                  <Marker key={idx} position={[shop.lat, shop.lng]}>
                    <Popup>
                      <strong>{shop.name}</strong><br />
                      {shop.address}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            {selectedPosition && (
              <div className="text-center mt-2 text-muted" style={{ fontSize: '0.98rem' }}>
                Selected Location: <span className="fw-semibold">{selectedPosition.lat.toFixed(4)}, {selectedPosition.lng.toFixed(4)}</span>
              </div>
            )}
            {/* Results List */}
            {results.length > 0 && (
              <ListGroup className="mt-3">
                {results.map((shop, idx) => (
                  <ListGroup.Item key={idx}>
                    <strong>{shop.name}</strong> — {shop.address}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SearchBarSection;