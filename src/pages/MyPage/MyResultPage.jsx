import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProblemCard from '../SetResultPage/ProblemCard';
import { StarIcon } from '../../assets/icons';
import ContainedButton from '../../components/button/ContainedButton';
import BlurModal from '../../components/modal/BlurModal';

import Stars from '../../components/banner/Stars';
import { useLocation } from 'react-router-dom';
import { getMyResult } from '../../utils/api/incorrect';
import { useParams } from 'react-router-dom';

const SetResultPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;

const SetInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 16px;
    margin: 24px;
    border-radius: 10px;
    font-size: 24px;
    background-color: rgba(18, 127, 255, 0.27);

    .title {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 24px;
        margin-bottom: 8px;
    }
    .title2 {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 24px;
        margin-bottom: 8px;
        margin-left: 5px;
    }
    .description {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        margin-bottom: 8px;
    }
    .count {
        font-family: 'DXSamgakGimbap Light';
        font-size: 25px;
        margin-bottom: 8px;
    }
    .difficulty {
        display: flex;
        align-items: center;
        .text {
            margin-right: 12px;
        }
        font-family: 'DXSamgakGimbap Light';
        font-size: 20px;
        margin-bottom: 8px;
    }
`;
const SetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 24px;
    margin-left: 24px;
    margin-bottom: 12px;
`;
const NameAndButtonBox = styled.div`
    .name {
        text-align: start;
        margin-bottom: 12px;
        font-family: 'DXSamgakGimbap Bold';
        font-size: 24px;
    }
`;
const ScoreBox = styled.div`
    display: flex;
    align-items: center;

    .text {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 20px;
        margin-right: 8px;
        background-color: transparent;
    }
    .score {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 24px;
        width: 62px;
        height: 57px;
        line-height: 57px;
        border-radius: 5px;
        background-color: white;
    }
`;

const MyResultPage = () => {
    const location = useLocation();
    const { wid, assignid, workbookTitle } = location.state || {};
    console.log('AssignId', assignid);

    const setInitialState = {
        title: '',
        description: '',
        questionNum: '',
    };
    const answerInitialState = {
        studentName: '',
        imgS3Url: '',
        answers: [],
        score: '',
    };

    const [openImage, setOpenImage] = useState(false);
    const [setData, setSetData] = useState(setInitialState);
    const [answerData, setAnswerData] = useState(answerInitialState);
    const [defaultData, setDefaultData] = useState();
    const [myId, setMyId] = useState();
    const [answerLength, setAnswerLength] = useState(0);

    useEffect(() => {
        getMyResultApi();
        console.log(workbookTitle);
    }, []);

    const getMyResultApi = async () => {
        const res = await getMyResult(assignid);
        // console.log('myresult', res);
        setAnswerData(res.data);
        setAnswerLength(res.data.answers.length);
    };

    return (
        <>
            {openImage && (
                <BlurModal
                    innerDatas={
                        <div onClick={() => setOpenImage(false)}>
                            <img
                                className="blur-image"
                                src={process.env.REACT_APP_S3_URL + answerData.imgS3Url}
                                alt="answerImage"
                            />
                        </div>
                    }
                />
            )}
            <SetResultPageLayout>
                <SetInformation>
                    <div className="title">
                        세트명:<span className="title2">{workbookTitle}</span>
                    </div>
                    <div className="difficulty">
                        <div className="text">문제 수:</div>
                        {answerLength}
                    </div>
                </SetInformation>
                <SetHeader>
                    <NameAndButtonBox>
                        <div className="name">{answerData.studentName}</div>
                        <ContainedButton
                            btnType="primary"
                            size="large"
                            text="제출한 이미지 보기"
                            onClick={() => setOpenImage(true)}
                        />
                    </NameAndButtonBox>
                    <ScoreBox>
                        <div className="text">맞은 개수</div>
                        <div className="score">
                            {answerData.score}/{answerLength}
                        </div>
                    </ScoreBox>
                </SetHeader>
                {answerData?.answers.map((answer, idx) => (
                    <ProblemCard
                        key={idx}
                        studentAnswer={answer.ocr_answer}
                        question={answer.questionFull}
                        analysis={answer.anlysis}
                        simillarity={answer.simillarity}
                    />
                ))}
            </SetResultPageLayout>
        </>
    );
};

export default MyResultPage;
