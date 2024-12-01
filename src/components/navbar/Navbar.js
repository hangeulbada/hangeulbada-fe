// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from 'styled-components';

import { BackIcon, Logo1, UserIcon } from '../../assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useOAuthState } from '../../utils/store/useLoginStore';

const NavbarLayout = styled.div`
    max-width: 500px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 24px;
    padding-bottom: 10px;
    background: transparent;
`;
const BackButton = styled.button`
    display: flex;
    margin-bottom: 20px;
    border-width: 0;
    background-color: transparent;
    &:hover {
        cursor: pointer;
    }
`;
const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const LogoIcon = styled.img`
    display: flex;
    align-items: center;
`;

const UserInfoBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 70%;
`;
const UserRole = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    width: 52px;
    height: 28px;
    margin-right: 6px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 15px;
    background-color: white;
`;
const UserName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 20px;
`;

const Navbar = () => {
    const { cid, name, email, role } = useOAuthState();

    const navigate = useNavigate();
    const onClickBackButton = () => {
        navigate(-1);
    };

    if (window.location.pathname === '/' && '/selectRole') return null;
    return (
        <NavbarLayout>
            <BackButton onClick={onClickBackButton}>
                <img src={BackIcon} alt="Back button" />
            </BackButton>
            <HeaderBox>
                <Link to="/">
                    <LogoIcon src={Logo1} />
                </Link>
                <UserInfoBox>
                    <UserRole>{role === 'teacher' ? '교사' : '학생'}</UserRole>
                    <UserName>{name}</UserName>
                    {role === 'teacher' ? (
                        <Link to="/">
                            <LogoIcon src={UserIcon} />
                        </Link>
                    ) : (
                        <Link to="/MyPage">
                            <LogoIcon src={UserIcon} />{' '}
                        </Link>
                    )}
                </UserInfoBox>
            </HeaderBox>
        </NavbarLayout>
    );
};

export default Navbar;
