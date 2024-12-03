import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createIncorrectNote } from '../../utils/api/student';
import ErrorModal from '../../components/modal/ErrorModal';
import { useNavigate } from 'react-router-dom';

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

export default function SelectMyPageButton() {
    const tags = ['구개음화', '연음화', '경음화', '유음화', '비음화', '기식음화', '겹받침', '음운규칙x'];
    const [step, setStep] = useState(0);
    const [action, setAction] = useState('');
    const [selectedTag, setSelectedTag] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const onClickMyResult = () => {
        navigate('/MyPage/results');
    };

    const onClickIncorrect = () => {
        navigate('/MyPage/incorrect');
    };

    const onClickTag = (tag) => {
        // 이미 선택된 태그를 다시 클릭하면 선택 해제
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };

    const onClickConfirm = () => {
        createIncorrectNoteApi();
    };

    const onCloseModal = () => {
        setIsOpen(false);
    };

    const createIncorrectNoteApi = async () => {
        try {
            const res = await createIncorrectNote(selectedTag);
            console.log('incorrectNote', res);
        } catch (error) {
            // console.error('Failed to fetch incorrect note:', error);
            setIsOpen(true);
        }
    };

    return (
        <>
            <SelectButtonLayout>
                <div className="Box">
                    <StyledRoleBox onClick={onClickMyResult}>나의 결과</StyledRoleBox>
                    <StyledRoleBox onClick={onClickIncorrect}>오답 노트</StyledRoleBox>
                </div>
            </SelectButtonLayout>
        </>
    );
}
