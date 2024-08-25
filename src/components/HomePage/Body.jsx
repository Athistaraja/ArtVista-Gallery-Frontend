import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { API } from '../API';
import Rating from 'react-rating'; 
import './Body.css'; 

const Body = () => {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${API}/artwork`);
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  const handleAddToCart = (artwork) => {
    dispatch(addToCart(artwork));
  };

  const handleRemoveFromCart = (artworkId) => {
    dispatch(removeFromCart(artworkId));
  };

  const isInCart = (artworkId) => {
    return cart.some(item => item._id === artworkId);
  };

  const handleRatingChange = async (rating, artworkId) => {
    try {
      await axios.patch(`${API}/artwork/${artworkId}/rating`, { rating });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const filteredArtworks = artworks.filter(artwork =>
    selectedCategory ? artwork.category.toLowerCase() === selectedCategory.toLowerCase() : true
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Welcome to ArtShop</h2>
      <Form className="mb-4">
        <Form.Group controlId="categorySelect" className="filter-form-group">
          <Form.Label className="filter-form-label">Filter by Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-form-control"
          >
            <option value="">All</option>
            <option value="painting">Painting</option>
            <option value="animation">Animation</option>
            <option value="drawing">Drawing</option>
            <option value="sculpture">Sculpture</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      <Row>
        {filteredArtworks.map((artwork) => (
          <Col xs={12} sm={6} md={4} lg={3} key={artwork._id} className="d-flex align-items-stretch">
            <Card className="mb-4">
              <Card.Img variant="top" src={artwork.image} alt={artwork.title} />
              <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Text>{artwork.artist.username}</Card.Text>
                <Card.Text>{artwork.description}</Card.Text>
                <Card.Text>Rs.{artwork.price}</Card.Text>
                <Rating
                  emptySymbol={<i className="fa fa-star transparent-star" />} 
                  fullSymbol={<i className="fa fa-star yellow-star" />} 
                  initialRating={artwork.rating} 
                  onChange={(rating) => handleRatingChange(rating, artwork._id)} 
                />
                <div className="mt-3">
                  {isInCart(artwork._id) ? (
                    <Button variant="danger" onClick={() => handleRemoveFromCart(artwork._id)}>
                      <i className="fa fa-shopping-cart"></i> Remove from Cart
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleAddToCart(artwork)}>
                      <i className="fa fa-shopping-cart"></i> Add to Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Body;
