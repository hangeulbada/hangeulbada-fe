import React from 'react';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

// 로딩 오버레이 스타일
const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 500px;
    height: 100vh;
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

function Loading() {
    return (
        <LoadingOverlay>
            <BeatLoader color="#127FFF" height={100} width={100} />
            <LoadingText>AI 문제를 생성중입니다...</LoadingText>
        </LoadingOverlay>
    );
}

export default Loading;
