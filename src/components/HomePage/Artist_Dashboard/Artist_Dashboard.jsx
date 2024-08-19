import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchArtworks,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from '../../slices/artworkSlice';
import './ArtistDashboard.css';

const ArtistDashboard = () => {
  const dispatch = useDispatch();
  const { items: artworks, status } = useSelector((state) => state.artworks);
  const [showModal, setShowModal] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, [dispatch]);

  const handleCreateOrUpdate = () => {
    if (currentArtwork._id) {
      dispatch(updateArtwork({ id: currentArtwork._id, updatedData: currentArtwork }));
    } else {
      dispatch(createArtwork(currentArtwork));
    }
    setShowModal(false);
    setCurrentArtwork(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteArtwork(id));
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Artist Dashboard</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Artwork
      </Button>
      <Row>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          artworks.map((artwork) => (
            <Col md={4} key={artwork._id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={artwork.image} alt={artwork.title} />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                  <Card.Text>{artwork.description}</Card.Text>
                  <Card.Text>Rs.{artwork.price}</Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCurrentArtwork(artwork);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(artwork._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentArtwork?._id ? 'Edit Artwork' : 'Add New Artwork'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentArtwork?.title || ''}
                onChange={(e) => setCurrentArtwork({ ...currentArtwork, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={currentArtwork?.description || ''}
                onChange={(e) => setCurrentArtwork({ ...currentArtwork, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentArtwork?.price || ''}
                onChange={(e) => setCurrentArtwork({ ...currentArtwork, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={currentArtwork?.image || ''}
                onChange={(e) => setCurrentArtwork({ ...currentArtwork, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdate}>
            {currentArtwork?._id ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ArtistDashboard;
