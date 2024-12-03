import React, { useState } from 'react';
import styled from 'styled-components';
import { ShareSet, ShareSetQuestions } from '../../utils/api/set';

const SetCreatePageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const HeaderBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 60px;
    margin-bottom: 0px;
    border-radius: 10px;
    background-color: transparent;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 24px;
`;

const Button = styled.div`
    height: 72px;
    width: 250px;
    margin: 15px;
    border-radius: 10px;
    border-color: transparent;
    transition: background 0.4s;
    font-family: 'DXSamgakGimbap Light';
    font-size: 18px;
    color: black;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: #127fff;
        color: #ffffff;
    }

    &:active {
        color: #ffffff;
        transform: scale(0.98);
    }

    &:visited {
        color: #ffffff;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 57px;
    margin-bottom: 70px;
`;

const ShareBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-top: 10px; */
    margin-bottom: 70px;
`;

const InputContainer = styled.input`
    display: flex;
    height: 65px;
    width: 230px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #ffffff;
    border-radius: 10px;
    padding-left: 20px;
    align-items: center;
    margin-bottom: 10px;
`;

const OkButton = styled.div`
    min-width: 90px;
    height: 40px;
    width: 90px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 14px;
    border-radius: 6px;
    border: hidden;
    color: #ffffff;
    background-color: ${(props) => (props.active ? '#127fff' : '#a9a9a9')};
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ShareQuestions = () => {
    const [step, setStep] = useState();
    const [shareCode, setShareCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupId, setGroupId] = useState('');

    const onClickMyQuestion = () => {
        window.location.href = '/setCreate';
    };

    const onClickShareQuestion = () => {
        setStep(1);
    };
    //문제 공유 api (shareCode, startDate, endDate)
    const ShareSetToClass = async () => {
        try {
            const res = await ShareSet(shareCode, startDate, endDate);
            // setGroupId(res.id);
        } catch (error) {
            console.error('Error sharing set:', error);
        } finally {
            window.location.href = `/setlist`;
        }
    };

    const onClickOk = () => {
        ShareSetToClass();
    };

    let bodyContent = (
        <>
            <SetCreatePageLayout>
                <HeaderBox>
                    <ShareBox>
                        <InputContainer
                            type="text"
                            value={shareCode}
                            onChange={(e) => setShareCode(e.target.value)}
                            placeholder="공유 코드 입력"
                        />
                        <InputContainer
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="시작날짜(YYYY-MM-DD)"
                        />
                        <InputContainer
                            type="text"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="종료날짜(YYYY-MM-DD)"
                        />

                        <OkButton active={shareCode} onClick={onClickOk}>
                            완료
                        </OkButton>
                    </ShareBox>
                </HeaderBox>
            </SetCreatePageLayout>
        </>
    );
    return (
        <SetCreatePageLayout>
            <HeaderBox>
                {step === 1 ? (
                    bodyContent
                ) : (
                    <Box>
                        <Button onClick={onClickShareQuestion}>문제 공유</Button>

                        <Button onClick={onClickMyQuestion}>나의 문제 생성</Button>
                    </Box>
                )}
            </HeaderBox>
        </SetCreatePageLayout>
    );
};

export default ShareQuestions;
