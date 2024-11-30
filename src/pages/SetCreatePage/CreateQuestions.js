import React, { useState } from 'react';
import styled from 'styled-components';
import TypeTag from './components/TypeTag';

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

const CreateQuestions = ({ count, inputValue, setInputValue, selectedTags, setSelectedTags }) => {
    const handleInputChange = (index, value) => {
        const newInputValue = [...inputValue];
        newInputValue[index] = value;
        setInputValue(newInputValue);
    };

    const handleSetSelectedTags = (index, newTags) => {
        const newSelectedTags = [...selectedTags];
        newSelectedTags[index] = newTags;
        setSelectedTags(newSelectedTags);
    };

    return (
        <SetCreatePageLayout>
            <CreateQuestionsLayout>
                {Array.from({ length: count }, (_, idx) => (
                    <>
                        <QuestionContainer key={idx}>
                            <div className="number">{idx + 1}번</div>
                            <InputContainer
                                type="text"
                                value={inputValue[idx] || ''}
                                onChange={(e) => handleInputChange(idx, e.target.value)}
                                placeholder="문장을 입력하세요"
                            />
                        </QuestionContainer>
                        <TypeTag
                            selectedTags={selectedTags[idx] || []}
                            setSelectedTags={(newTags) => handleSetSelectedTags(idx, newTags)}
                        />
                    </>
                ))}
            </CreateQuestionsLayout>
        </SetCreatePageLayout>
    );
};

export default CreateQuestions;
