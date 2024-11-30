import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProblemCard from './ProblemCard';
import ContainedButton from '../../components/button/ContainedButton';
import { StarIcon } from '../../assets/icons';
import { useParams } from 'react-router-dom';
import { getSet } from '../../utils/api/set';
import BlurModal from '../../components/modal/BlurModal';
import { addQuestion, getSetQuestions } from '../../utils/api/question';
import Stars from '../../components/banner/Stars';
import TypeTagOne from './TypeTagOne';

const SetPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const SetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px;
    font-size: 24px;
`;
const SetInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;

    .title {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 24px;
        margin-bottom: 8px;
    }
    .description {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        margin-bottom: 8px;
    }
    .count {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        margin-bottom: 8px;
    }
    .difficulty {
        display: flex;
        align-items: center;
        .text {
            margin-right: 12px;
        }
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
    }
`;
const HeaderButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90px;
`;
const AddQuestionLayout = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    padding: 14px;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 24px;

    .add-input {
        align-self: center;
        text-align: center;
        border: none;
        border-radius: 10px;
        outline: none;
        width: 379px;
        height: 43px;
        margin-bottom: 10px;

        font-family: 'DXSamgakGimbap Light';
        font-size: 15px;
    }
`;

const SetPage = () => {
    const { id } = useParams();

    const initialSetState = {
        id: '',
        title: '',
        description: '',
        difficulty: 0,
        questionIds: [],
        questionNum: '',
    };

    const [isAddClicked, setIsAddClicked] = useState(false);
    const [isRemoveClicked, setIsRemoveClicked] = useState(false);
    const [setData, setSetData] = useState(initialSetState);
    const [questions, setQuestions] = useState([]);
    const [inputValue, setInputValue] = useState();
    const [selectedTag, setSelectedTag] = useState();

    useEffect(() => {
        const getSetData = async () => {
            await getSet(id).then((res) => {
                setSetData(res.data);
            });
        };
        const getQuestions = async () => {
            await getSetQuestions(id).then((res) => {
                setQuestions(res.data);
            });
        };
        getSetData();
        getQuestions();
    }, []);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const addOnClick = () => {
        const fetch = async (id, inputValue, selectedTag) => {
            const question = {
                content: inputValue,
                difficulty: 0,
                tags: [selectedTag],
            };
            await addQuestion(id, question).then((res) => {
                setIsAddClicked(false);
                window.location.reload();
            });
        };
        fetch(id, inputValue, selectedTag);
    };

    return (
        <>
            {isAddClicked && (
                <BlurModal
                    innerDatas={
                        <AddQuestionLayout>
                            <input
                                className="add-input"
                                type="text"
                                value={inputValue || ''}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="문장을 입력하세요"
                            />
                            <TypeTagOne selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
                        </AddQuestionLayout>
                    }
                    footerDatas={
                        <>
                            <ContainedButton btnType="primary" size="mid" text="완료" onClick={addOnClick} />
                            <ContainedButton
                                btnType="secondary"
                                size="mid"
                                text="취소"
                                onClick={() => setIsAddClicked(false)}
                            />
                        </>
                    }
                />
            )}
            {isRemoveClicked && (
                <BlurModal
                    innerDatas={
                        <>
                            {questions.map((question, idx) => (
                                <ProblemCard
                                    key={idx}
                                    idx={idx + 1}
                                    content={question.content}
                                    isRemove
                                    questions={questions}
                                    setQuestions={setQuestions}
                                    id={question.id}
                                />
                            ))}
                            <ContainedButton
                                btnType="primary"
                                size="mid"
                                text="완료"
                                onClick={() => setIsRemoveClicked(false)}
                            />
                            <ContainedButton
                                btnType="secondary"
                                size="mid"
                                text="취소"
                                onClick={() => setIsRemoveClicked(false)}
                            />
                        </>
                    }
                />
            )}
            <SetPageLayout>
                <SetHeader>
                    <SetInformation>
                        <div className="title">{setData.title}</div>
                        <div className="description">{setData.description}</div>
                        <div className="count">문제 수 {setData.questionNum}</div>
                        <div className="difficulty">
                            <div className="text">난이도</div>
                            <Stars difficulty={setData.difficulty} />
                        </div>
                    </SetInformation>
                    <HeaderButtonBox>
                        <ContainedButton
                            btnType="primary"
                            size="mid"
                            text="문장 추가"
                            onClick={() => setIsAddClicked(true)}
                        />
                        <ContainedButton
                            btnType="secondary"
                            size="mid"
                            text="문장 삭제"
                            onClick={() => setIsRemoveClicked(true)}
                        />
                    </HeaderButtonBox>
                </SetHeader>
                {questions.map((question, idx) => (
                    <ProblemCard key={idx} idx={idx + 1} content={question.content} soundUrl={question.audioFilePath} />
                ))}
            </SetPageLayout>
        </>
    );
};

export default SetPage;
