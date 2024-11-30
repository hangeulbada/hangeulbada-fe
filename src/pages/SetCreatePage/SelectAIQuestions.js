import React, { useState } from 'react';
import styled from 'styled-components';

const SelectButtonLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .Box {
        margin-top: 57px;
        margin-bottom: 70px;
    }
`;
const StyledRoleBox = styled.button`
    height: 72px;
    width: 250px;
    margin: 15px;
    border-radius: 10px;
    // border-width: 1px;
    border-color: transparent;
    transition: background 0.4s;
    cursor: pointer;

    font-family: 'DXSamgakGimbap Light';
    font-size: 18px;
    color: black;

    &:focus {
        border-color: #127fff;
        color: white;
        background-color: #127fff;
    }
    &:hover {
        border-color: #127fff;
        color: white;
        background-color: #127fff;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 57px;
    margin-bottom: 70px;
`;

const SelectAIQuestions = ({ aiAction, setAiAction }) => {
    const onClickSelfQuestions = () => {
        setAiAction('self');
    };

    const onClickAIQuestions = () => {
        setAiAction('AI');
    };

    return (
        <div>
            <SelectButtonLayout>
                <div className="Box">
                    <StyledRoleBox onClick={onClickSelfQuestions}>직접 문제 생성</StyledRoleBox>
                    <StyledRoleBox onClick={onClickAIQuestions}>AI 문제 생성</StyledRoleBox>
                </div>
            </SelectButtonLayout>
        </div>
    );
};

export default SelectAIQuestions;
