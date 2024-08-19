import React from 'react';
import axios from 'axios';
import { API } from '../API';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './Login.css';
import '../toastify.css';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .required('Password is a required field')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
  });

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`${API}/auth/login`, values);
      const { token, userId, role } = response.data;

      // Store token, userId, and role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);

      toast.success('Login successful');

      // Redirect user to the home page
      navigate('/home');
    } catch (error) {
      toast.error('Invalid Credentials');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="login-form-container">
      <h2><b>Artvista Gallery Login</b></h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              autoComplete="on"
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </Form>
      </Formik>
      <div className="redirect-link">
        Don't have an account? <Link to="/register">Go to Register</Link>
      </div>
    </div>
  );
};

export default Login;
