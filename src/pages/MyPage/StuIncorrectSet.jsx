import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getIncorrectGroup } from '../../utils/api/incorrect';
import IncorrectClassBox from './component/IncorrectClassBox';

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

export default function StuIncorrectSet() {
    const [note, setNote] = useState([]);
    const [groupName, setGroupName] = useState();
    const [groupDesc, setGroupDesc] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        getIncorrectGroupApi();
    }, []);

    const getIncorrectGroupApi = async () => {
        const res = await getIncorrectGroup();
        // console.log('Res', res.data);
        setNote(res.data.workbookIds);
        setGroupName(res.data.groupName);
        setGroupDesc(res.data.description);
        setId(res.data.studentIds[0]);
    };

    return (
        <SetListPageLayout>
            <ClassListTitle>나의 오답노트</ClassListTitle>

            <IncorrectClassBox id={id} title={groupName} desc={groupDesc} workbookIds={note}></IncorrectClassBox>
        </SetListPageLayout>
    );
}
