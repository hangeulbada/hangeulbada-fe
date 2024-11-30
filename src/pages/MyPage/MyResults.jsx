import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAssignmentAll, getIncorrectNote } from '../../utils/api/student';
import ErrorModal from '../../components/modal/ErrorModal';
import { createIncorrectNote } from '../../utils/api/student';
import StuSetResultBox from './StuSetResultBox';
import { getStatistics } from '../../utils/api/incorrect';
import StatPieChart from './component/StatPieChart';

const SetListPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;

const ClassListTitle = styled.div`
    font-family: 'DXSamgakGimbap Bold';
    font-size: 24px;
    font-weight: 500;
    display: flex;
    margin: 30px 0 25px 30px;
`;
const ClassListButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 60%;
    margin: 0 0 0 40%;
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

export default function MyResults() {
    const tags = ['구개음화', '연음화', '경음화', '유음화', '비음화', '기식음화', '겹받침', '음운규칙x'];
    const [step, setStep] = useState(0);
    const [action, setAction] = useState('');
    const [setList, setSetList] = useState([]);
    const [selectedTag, setSelectedTag] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [createNote, setCreateNote] = useState([]);
    const [stuID, setStuID] = useState();
    const [groupId, setGroupId] = useState();
    const [assignId, setAssignId] = useState();
    const [stat, setStat] = useState([]);
    const chartData = '';

    useEffect(() => {
        IncorrectGroupApi();
    }, []);

    //api 요청 함수
    const IncorrectGroupApi = async () => {
        try {
            // const res = await getIncorrectNote();
            const res2 = await getAssignmentAll();
            // console.log('note', res);
            console.log('res', res2);

            setSetList(res2.data);

            setAssignId(res2.data.assignmentId);
        } catch (err) {}
    };
    const createIncorrectNoteApi = async () => {
        try {
            const res = await createIncorrectNote(selectedTag);
            // console.log('incorrectNote', res);
        } catch (error) {
            // console.error('Failed to fetch incorrect note:', error);
            setIsOpen(true);
        }
    };

    //그래프 api
    const getStatisticsApi = async () => {
        try {
            const res = await getStatistics();

            setStat(res.data);
            console.log('stat', res.data);
        } catch (error) {}
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
    };

    const onClickResultGraph = () => {
        setAction('graph');
        setStep(1);
        getStatisticsApi();
    };

    //결과 그래프 return 값
    if (step === 1 && action === 'graph') {
        return (
            <SetListPageLayout>
                <ClassListTitle>음운유형 별 오답 그래프</ClassListTitle>
                <StatPieChart stat={stat} />
            </SetListPageLayout>
        );
    }

    //오답 문제 생성
    if (step === 1 && action === 'createIncorrectNote') {
        return (
            <SetListPageLayout>
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
                <ButtonDiv>
                    <ConfirmButton onClick={() => onClickConfirm()}>완료</ConfirmButton>
                </ButtonDiv>
                {isOpen && (
                    <ErrorModal isOpen={isOpen} message={'해당 유형의 오답 기록이 없습니다.'} onClose={onCloseModal} />
                )}
            </SetListPageLayout>
        );
    }

    return (
        <SetListPageLayout>
            <ClassListTitle>모든 세트 결과</ClassListTitle>
            <ClassListButtonBox>
                <CreateButton onClick={onClickResultGraph}>결과 그래프</CreateButton>
            </ClassListButtonBox>
            {setList?.map((element) => (
                <StuSetResultBox
                    key={element.id}
                    id={element.id}
                    title={element.workbookTitle}
                    desc={element.score}
                    assignmentId={element.assignmentId}
                    workbookId={element.workbookId}
                    // studentId={stuID}
                    // groupId={groupId}
                ></StuSetResultBox>
            ))}
        </SetListPageLayout>
    );
}
