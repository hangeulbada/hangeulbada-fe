import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SetBox from '../StuSetListPage/setBox';

const ClassListTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    margin: 30px 0 0 30px;
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
`;

export default function ResultSet() {
    const [setList, setSetList] = useState([]);

    const onClickSetId = () => {};

    return (
        <ClassEnterPageLayout>
            <ClassListTitle>나의 결과</ClassListTitle>
            <StyledBoxLayout>
                {setList.map((data) => (
                    <SetBox key={data.setId} />
                ))}
            </StyledBoxLayout>
        </ClassEnterPageLayout>
    );
}
