import React, { useState } from 'react';
import styled from 'styled-components';

import { GoogleLoginIcon } from '../../../assets/icons';
import { useGoogleLogin } from '@react-oauth/google';
import { useLoginState, useOAuthState } from '../../../utils/store/useLoginStore';
import axios from 'axios';
import { requestLogin } from '../../../utils/api/auth';

const LoginButtonLayout = styled.button`
    display: flex;
    border-width: 0;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }
`;

const LoginButton = () => {
    const { setCid, setName, setEmail } = useOAuthState();
    const { setLogin } = useLoginState();

    const loginOnClick = useGoogleLogin({
        onSuccess: async (res) => {
            const userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${res.access_token}`,
                },
            });
            setCid(userData.data.sub);
            setName(userData.data.name);
            setEmail(userData.data.email);
            setLogin(true);

            //window.location.reload();
            //localStorage.setItem("refreshToken", res.refreshToken);
        },
    });

    return (
        <LoginButtonLayout onClick={loginOnClick}>
            <img src={GoogleLoginIcon} alt="copy" />
        </LoginButtonLayout>
    );
};

export default LoginButton;
