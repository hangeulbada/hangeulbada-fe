import React from 'react';
import styled from 'styled-components';
import SetBox from '../StuSetListPage/SetBox';

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
    margin: 30px 0 0 30px;
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
`;

const dummy_set = [
    {
        setId: 1,
        title: '세트1',
        desc: '세트1에 관한 설명입니다.',
        quesCnt: 8,
        deadline: '2024-08-08',
    },
    {
        setId: 2,
        title: '세트2',
        desc: '세트2에 관한 설명입니다.',
        quesCnt: 9,
        deadline: '2024-08-08',
    },
    {
        setId: 3,
        title: '세트3',
        desc: '세트3에 관한 설명입니다.',
        quesCnt: 10,
        deadline: '2024-12-08',
    },
];

const StuSetListPage = () => {
    return (
        <ClassEnterPageLayout>
            <ClassListTitle>클래스명</ClassListTitle>
            {/* <StyledSetBox> */}
            <StyledBoxLayout>
                {dummy_set.map((data) => (
                    <SetBox
                        key={data.setId}
                        title={data.title}
                        desc={data.desc}
                        quesCnt={data.quesCnt}
                        deadline={data.deadline}
                    />
                ))}
            </StyledBoxLayout>
            {/* </StyledSetBox> */}
        </ClassEnterPageLayout>
    );
};

export default StuSetListPage;
