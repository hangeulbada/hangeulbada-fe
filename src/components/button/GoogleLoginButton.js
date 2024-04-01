import React from 'react';
import styled from 'styled-components';

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButtonLayout = styled.div``;

const GoogleLoginButton = () => {

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      
    }
  })

  return (
    <GoogleLoginButtonLayout>
    </GoogleLoginButtonLayout>
  );
};

export default GoogleLoginButton;