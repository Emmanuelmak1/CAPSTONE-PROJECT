import React, { useState } from 'react';
import { MDBIcon, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';

function SignupPopUp({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your backend
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Important for cookies to be sent with requests
      });

      if (response.ok) {
        const data = await response.json();
        // Pass user data to the parent component on successful signup
        onSignupSuccess(data);
      } else {
        // Handle error response from the server
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="signup-popup-overlay">
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='signup-popup'>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="fw-bold mb-4 text-center">Sign Up</h2>
                <p className="text-muted mb-4 text-center">Create an account to ease yourself in!</p>

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass='mb-4 form-group'
                    label='Username'
                    id='username'
                    type='text'
                    size="lg"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <MDBInput
                    wrapperClass='mb-4 form-group'
                    label='Email address'
                    id='email'
                    type='email'
                    size="lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <MDBInput
                    wrapperClass='mb-4 form-group'
                    label='Password'
                    id='password'
                    type='password'
                    size="lg"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <MDBBtn
                    size='lg'
                    className='mb-4 btn-signup'
                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                    type="submit"
                  >
                    Sign Up
                  </MDBBtn>
                </form>

                <hr className="my-4" />

                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                  <MDBIcon fab icon="google" className="mx-2" />
                  Sign Up with Google
                </MDBBtn>

                <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Sign Up with Facebook
                </MDBBtn>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignupPopUp;
