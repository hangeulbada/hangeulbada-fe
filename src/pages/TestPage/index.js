import React from 'react';
import styled from 'styled-components';
import QuestBox from './QuestBox';

const SetListPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const ClassListTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    margin: 30px 0 30px 30px;
`;

const StyledWarningText = styled.div`
    padding: 10px;
    color: red;
`;

const StyledQuestLayout = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledQuestCol = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 70px 10px 30px;

    &:nth-child(1) {
        padding: 0 0 0 40px;
    }
`;

// cnt 문제수
const questDummy = [
    {
        id: 1,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 2,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 3,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 4,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 5,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 6,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 7,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 8,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 9,
        text: '아기가 아장아장 걸어요',
    },
    {
        id: 10,
        text: '아기가 아장아장 걸어요',
    },
];

const TestPage = () => {
    return (
        <div>
            <SetListPageLayout>
                <ClassListTitle>세트명</ClassListTitle>
                <StyledWarningText>반드시 문제 앞에 번호를 써 주세요.</StyledWarningText>
                <StyledQuestLayout>
                    <StyledQuestCol>
                        {questDummy
                            .filter((data) => data.id <= 5)
                            .map((data) => (
                                <QuestBox key={data.id} num={data.id} />
                            ))}
                    </StyledQuestCol>
                    <StyledQuestCol>
                        {questDummy
                            .filter((data) => data.id > 5)
                            .map((data) => (
                                <QuestBox key={data.id} num={data.id} />
                            ))}
                    </StyledQuestCol>
                </StyledQuestLayout>
            </SetListPageLayout>
        </div>
    );
};

export default TestPage;
