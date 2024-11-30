import React from 'react';
import styled from 'styled-components';
import SetBox from './setBox';
import { useState, useEffect } from 'react';
import { getSetListByWBId } from '../../utils/api/set';
import { getSetByClass } from '../../utils/api/student';
import { useLocation } from 'react-router-dom';
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

const StuSetListPage = () => {
    const [setList, setSetList] = useState([]);
    const location = useLocation();
    const { id, title } = location.state || {};

    // console.log('setlist의id: ', id);
    // console.log('setList의 title', title);

    const groupId = id;

    useEffect(() => {
        const fetchSetList = async () => {
            if (groupId) {
                try {
                    const res = await getSetByClass(groupId);
                    setSetList(res.data);
                } catch (err) {
                    console.error('Error: ', err);
                }
            }
        };

        fetchSetList();
    }, [groupId]);

    return (
        <ClassEnterPageLayout>
            <ClassListTitle>{title}</ClassListTitle>
            {/* <StyledSetBox> */}
            <StyledBoxLayout>
                {setList.map((data) => (
                    <SetBox
                        key={data.setId}
                        title={data.title}
                        desc={data.description}
                        quesCnt={data.questionNum}
                        difficulty={data.difficulty}
                        groupId={groupId}
                        workbookId={data.id}
                    />
                ))}
            </StyledBoxLayout>
            {/* </StyledSetBox> */}
        </ClassEnterPageLayout>
    );
};

export default StuSetListPage;
