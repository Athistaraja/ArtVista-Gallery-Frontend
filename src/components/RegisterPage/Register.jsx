import React from 'react';
import axios from 'axios';
import {API} from '../API';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './Register.css'// tostify style also add a register.css


const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    role: 'user', // default role
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Password is a required field').min(6, "Password must be at least 6 characters")
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
    role: Yup.string().oneOf(['user', 'artist']).required('Required'),
  });
    const navigate = useNavigate();
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(`${API}/auth/register`, values);
        toast.success('Registration successful');
        resetForm();
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
      setSubmitting(false);
    };

  return (
    <div className="form-container">
      <h2><b>Artvista Gallery Register</b></h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <span htmlFor="username">Username</span>
              <Field autoComplete='on' type="text" id="username" name="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field autoComplete='on' type="email" id="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Field as="select" id="role" name="role" className="form-control">
                <option value="user">User</option>
                <option value="artist">Artist</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
      <div className="redirect-link">
        Already have an account? <Link to="/">Go to Login</Link>
      </div>
    </div>
  );
};

export default Register;
