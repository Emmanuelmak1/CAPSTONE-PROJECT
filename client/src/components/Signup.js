import React from 'react';
import SignupPopUp from './SignupPopUp';

function Signup() {
  const handleSignupSuccess = (userData) => {
    // Handle successful signup here, e.g., redirecting the user
    console.log('Signup successful:', userData);
  };

  return (
    <SignupPopUp onSignupSuccess={handleSignupSuccess} />
  );
}

export default Signup;
