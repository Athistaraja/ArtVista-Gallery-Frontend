import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../../API';
import { toast } from 'react-toastify';

const ArtistDashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    portfolio: '',
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API}/artist/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/artist/${userId}`, profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <Container className="my-5">
      <h2>Artist Dashboard</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="portfolio">
          <Form.Label>Portfolio</Form.Label>
          <Form.Control
            type="text"
            name="portfolio"
            value={profile.portfolio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Save Profile</Button>
      </Form>
    </Container>
  );
};

export default ArtistDashboard;
