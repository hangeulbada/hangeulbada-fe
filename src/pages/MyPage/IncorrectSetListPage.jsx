import React from 'react';
import styled from 'styled-components';
import SetBox from '../StuSetListPage/setBox';
import { useState, useEffect } from 'react';

import { getIncorrectNote, getSetByClass } from '../../utils/api/student';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import ErrorModal from '../../components/modal/ErrorModal';
import { createIncorrectNote } from '../../utils/api/student';

const SetListPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;

const ClassListHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 24px;
`;

const ClassListTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    margin: 30px 0 10px 30px;
    font-family: 'DXSamgakGimbap Medium';
`;
const ClassEnterPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    //align-items: center;
    background-color: rgba(74, 190, 255, 0.25);
`;

const StyledBoxLayout = styled.div`
    padding: 10px;
    margin: 10px;
    margin-left: 30px;
`;

const ClassListButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 60%;
    margin: 0 0 0 40%;
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

const CreateButton = styled.div`
    width: 130px;
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
    margin-right: 20px;
    margin-bottom: 5px;
`;

const IncorrectSetListPage = () => {
    const [setList, setSetList] = useState([]);
    const location = useLocation();
    const { id, title } = location.state || {};
    const navigate = useNavigate();

    const tags = ['구개음화', '연음화', '경음화', '유음화', '비음화', '기식음화', '겹받침', '음운규칙x'];
    const [step, setStep] = useState(0);
    const [action, setAction] = useState('');
    const [selectedTag, setSelectedTag] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getIncorrectNoteApi();
    }, []);

    const getIncorrectNoteApi = async () => {
        const res = await getIncorrectNote();
        setSetList(res.data);
        // console.log('res', res);
    };

    //

    const createIncorrectNoteApi = async () => {
        try {
            const res = await createIncorrectNote(selectedTag);
            // console.log('incorrectNote', res);
            setIsOpen(true);
            setMessage('새로운 오답노트가 생성되었습니다.');
        } catch (error) {
            // console.error('Failed to fetch incorrect note:', error);
            setIsOpen(true);
            setMessage('해당 유형의 오답 기록이 없습니다.');
        }
    };

    //버튼 이벤트 함수
    const createOnClick = () => {
        setAction('createIncorrectNote');
        setStep(1);
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
        setStep(0);
    };

    //오답 문제 생성
    if (step === 1 && action === 'createIncorrectNote') {
        return (
            <SetListPageLayout>
                <ClassListTitle>문제 유형 선택</ClassListTitle>
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
                <ButtonDiv>
                    <ConfirmButton onClick={() => onClickConfirm()}>완료</ConfirmButton>
                </ButtonDiv>
                {isOpen && <ErrorModal isOpen={isOpen} message={message} onClose={onCloseModal} />}
            </SetListPageLayout>
        );
    }
    return (
        <ClassEnterPageLayout>
            <ClassListTitle>{title}노트</ClassListTitle>
            <ClassListButtonBox>
                <CreateButton onClick={createOnClick}>오답시험 보기</CreateButton>
            </ClassListButtonBox>
            <StyledBoxLayout>
                {setList.map((data) => (
                    <SetBox
                        key={data.setId}
                        title={data.title}
                        desc={data.description}
                        quesCnt={data.questionNum}
                        difficulty={data.difficulty}
                        // groupId={groupId}
                        workbookId={data.id}
                    />
                ))}
            </StyledBoxLayout>
            {/* </StyledSetBox> */}
        </ClassEnterPageLayout>
    );
};

export default IncorrectSetListPage;
