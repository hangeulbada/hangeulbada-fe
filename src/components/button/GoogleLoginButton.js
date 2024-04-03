import React from 'react';
import styled from 'styled-components';

import { useGoogleLogin } from '@react-oauth/google';

import { requestLogin } from '../../utils/api/auth';

const GoogleLoginButtonLayout = styled.div``;

const GoogleLoginButton = () => {

  const responseGooogleLogin = async (code, socialType) => {
    await requestLogin(code, socialType).then((res) => {
      
    })
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      responseGooogleLogin(res.access_token, "GOOGLE");
    },
  });

  return (
    <GoogleLoginButtonLayout>
      <button onClick={googleLogin}>Btn</button>
    </GoogleLoginButtonLayout>
  );
};

export default GoogleLoginButton;