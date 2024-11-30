import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginButton from './components/LoginButton';
import { useLoginState, useOAuthState } from '../../utils/store/useLoginStore';
import ContainedButton from '../../components/button/ContainedButton';
import { requestLogin } from '../../utils/api/auth';

const IntroPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    align-items: center;
`;
const IntroInputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 55%;
    height: 300px;
    width: 100%;
`;
const IntroRoleLayout = styled.div`
    display: flex;
    flex-direction: column;
    margin: 70%;
    height: 300px;
    width: 70%;
`;
const IntroButtonBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 36px;
`;

const RoleButtonLayout = styled.button`
    width: 127px;
    height: 116px;
    border: ${({ clicked }) => (clicked ? '8px solid #127FFF' : 'hidden')};
    border-radius: 10px;
    background-color: white;
    color: black;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.4);

    font-family: 'DXSamgakGimbap Medium';
    font-size: 20px;
    .or {
        margin-top: 8px;
        margin-bottom: 8px;
        font-family: 'DXSamgakGimbap light';
        font-size: 15px;
    }

    &:hover {
        cursor: pointer;
    }
`;

const TextBox = styled.div`
    margin-bottom: 40px;
    color: white;
    font-family: 'DXSamgakGimbap light';
    font-size: 20px;
`;

const RoleButton = ({ role, clicked, onClick }) => {
    return (
        <RoleButtonLayout clicked={clicked} onClick={onClick}>
            <div>{role === 'teacher' ? '선생님' : '학생'}</div>
            <div className="or">혹은</div>
            <div>{role === 'teacher' ? '학부모' : '자녀'}</div>
        </RoleButtonLayout>
    );
};

const IntroPage = () => {
    const [leftBtnClicked, setLeftBtnClicked] = useState(false);
    const [rightBtnClicked, setRighttBtnClicked] = useState(false);
    const [active, setActive] = useState(false);

    const { isLogin, setLogin } = useLoginState();
    const { cid, name, email, role, setRole } = useOAuthState();

    const leftBtnOnClick = () => {
        setLeftBtnClicked(true);
        setRighttBtnClicked(false);
        setRole('teacher');
        setActive(true);
    };

    const rightBtnOnClick = () => {
        setLeftBtnClicked(false);
        setRighttBtnClicked(true);
        setRole('student');
        setActive(true);
    };

    const submitOnClick = () => {
        const requestGoogleLogin = async (cid, name, email) => {
            await requestLogin(cid, name, email, role).then((res) => {
                window.location.href = '/main';
            });
        };

        requestGoogleLogin(cid, name, email);
    };

    return (
        <IntroPageLayout>
            {isLogin ? (
                <IntroRoleLayout>
                    <IntroButtonBox>
                        <RoleButton role="teacher" clicked={leftBtnClicked} onClick={leftBtnOnClick} />
                        <RoleButton role="student" clicked={rightBtnClicked} onClick={rightBtnOnClick} />
                    </IntroButtonBox>
                    <div>
                        <ContainedButton
                            btnType="secondary"
                            size="mid"
                            text="확인"
                            disabled={!active}
                            onClick={submitOnClick}
                        />
                    </div>
                </IntroRoleLayout>
            ) : (
                <IntroInputBox>
                    <TextBox>로그인/회원가입</TextBox>
                    <LoginButton />
                </IntroInputBox>
            )}
        </IntroPageLayout>
    );
};

export default IntroPage;
