import React, { useState } from 'react';
import styled from 'styled-components';
import { generateAIQuestions } from '../../utils/api/question';
import Loading from '../../components/loading/Loading';
import { createAIQuestionSet } from '../../utils/api/question';

const Title = styled.div`
    font-family: 'DXSamgakGimbap Medium';
    font-size: 20px;
    display: flex;
    margin-left: 30px;
    margin-top: 10px;
`;

const TagButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px; // 각 태그 사이의 간격
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 20px;
    margin-bottom: 18px;
`;

const TagButton = styled.div`
    font-family: 'DXSamgakGimbap Medium';
    font-size: 15px;
    width: 76px;
    height: 53px;
    margin-left: 16px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.selected {
        background-color: #127fff;
        /* opacity: 80%; */
        color: #ffffff;
    }
`;

const AgeField = styled.input`
    width: 76px;
    height: 53px;
    margin-top: 15px;
    margin-left: 50px;
    background-color: #ffffff;
    border-radius: 10px;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 19px;
    text-align: center;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
`;

const ConfirmButton = styled.div`
    width: 90px;
    height: 41px;
    border-radius: 5px;
    background-color: #127fff;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 15px;
    cursor: pointer;
`;

const SetCreatePageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;

const CreateQuestionsLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

const QuestionContainer = styled.div`
    display: flex;
    align-items: center;
    width: 440px;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 8px;
    background-color: white;

    font-family: 'DXSamgakGimbap Light';
    font-size: 15px;

    .number {
        margin-left: 25px;
        margin-right: 25px;
    }
`;

const InputContainer = styled.input`
    width: 75%;
    border: none;
    outline: none;
    font-family: 'DXSamgakGimbap Light';
    font-size: 15px;
`;

const SubmitButton = styled.div`
    width: 90px;
    height: 41px;
    border-radius: 5px;
    background-color: #127fff;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 15px;
    cursor: pointer;
    margin-right: 32px;
    margin-bottom: 8px;
`;

const SubmitDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CreateAiQuestions = ({ count, diff, workbookId }) => {
    const tags = ['구개음화', '연음화', '경음화', '유음화', '비음화', '기식음화', '겹받침', '음운규칙x'];
    const [difficulty, setDifficulty] = useState(0);
    const [selectedTag, setSelectedTag] = useState();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [sentences, setSentences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <Loading />;
    }

    const onClickTag = (tag) => {
        // 이미 선택된 태그를 다시 클릭하면 선택 해제
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };

    const createAIQuestions = async (difficulty, selectedTag, count) => {
        try {
            setIsLoading(true);
            await generateAIQuestions(difficulty, selectedTag, count).then((res) => {
                const sentencesArray = Object.values(res.data); // 객체의 값만을 배열로 변환
                setSentences(sentencesArray);
                setIsConfirmed(true);
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onClickConfirm = () => {
        createAIQuestions(difficulty, selectedTag, count, workbookId);
    };

    const createAISet = async (workbookId, sentences, selectedTag, difficulty) => {
        try {
            // setIsLoading(true);
            const questions = sentences.map((content) => ({
                content: content,
                // difficulty: difficulty,
                tags: [selectedTag],
            }));
            await createAIQuestionSet(workbookId, questions, difficulty).then((res) => {
                window.location.href = '/setList';
            });
        } catch (error) {
            console.error(error);
        } finally {
            // setIsLoading(false);
        }
    };

    const onClickSubmit = () => {
        createAISet(workbookId, sentences, selectedTag, difficulty);
    };

    if (isConfirmed && sentences.length > 0) {
        return (
            <SetCreatePageLayout>
                <SubmitDiv>
                    <Title>{'#' + selectedTag}</Title>
                    <SubmitButton onClick={() => onClickSubmit()}>완료</SubmitButton>
                </SubmitDiv>
                <CreateQuestionsLayout>
                    {sentences.map((sentence, idx) => (
                        <React.Fragment key={idx}>
                            <QuestionContainer>
                                <div className="number">{idx + 1}번</div>
                                <InputContainer
                                    type="text"
                                    value={sentence || ''}
                                    onChange={(e) =>
                                        setSentences((s) => [...s.slice(0, idx), e.target.value, ...s.slice(idx + 1)])
                                    }
                                    placeholder="문장을 입력하세요"
                                />
                            </QuestionContainer>
                        </React.Fragment>
                    ))}
                </CreateQuestionsLayout>
            </SetCreatePageLayout>
        );
    }

    return (
        <>
            <Title>문제 유형 선택</Title>
            <TagButtonContainer>
                {tags.map((tag) => (
                    <TagButton
                        key={tag}
                        onClick={() => onClickTag(tag)}
                        className={selectedTag === tag ? 'selected' : ''}
                    >
                        {tag}
                    </TagButton>
                ))}
            </TagButtonContainer>
            <Title>난이도 입력(1~5)</Title>
            <AgeField value={difficulty} onChange={(e) => setDifficulty(e.target.value)}></AgeField>
            <ButtonDiv>
                <ConfirmButton onClick={() => onClickConfirm()}>완료</ConfirmButton>
            </ButtonDiv>
        </>
    );
};

export default CreateAiQuestions;
