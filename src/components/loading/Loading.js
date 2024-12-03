import React from 'react';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

// 로딩 오버레이 스타일

const WebAppContainer = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100%;
    background-color: white;
    background-size: cover;
`;
const LoadingOverlay = styled.div`
    position: absolute;
    top: -130px;
    left: 0;
    width: 100vw;
    max-width: 500px;
    height: 114vh;
    background: rgba(255, 255, 255, 0.8); // 흰색 배경에 투명도 70%
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; // 다른 요소들 위에 오도록 z-index 설정
    display: flex;
    flex-direction: column;
`;

const LoadingText = styled.div`
    margin-top: 10px;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 15px;
`;

function Loading({ message }) {
    return (
        <WebAppContainer>
            <LoadingOverlay>
                <BeatLoader color="#127FFF" height={100} width={100} />
                <LoadingText>{message}</LoadingText>
            </LoadingOverlay>
        </WebAppContainer>
    );
}

export default Loading;
