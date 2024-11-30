import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ClassCard from './ClassCard';
import ContainedButton from '../../components/button/ContainedButton';
import BlurModal from '../../components/modal/BlurModal';
import { getClassList } from '../../utils/api/class';

const ClassListPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const ClassListBox = styled.div`
    margin: 10px 18px;
`;
const ClassListHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 24px;
`;
const ClassListTitle = styled.div`
    font-family: 'DXSamgakGimbap Medium';
    font-size: 24px;
`;
const ClassListButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 45%;
`;

const ClassListPage = () => {
    const [isRemoveClicked, setIsRemoveClicked] = useState(false);

    const [classList, setClassList] = useState([]);
    // console.log(localStorage.getItem('accessToken'));

    useEffect(() => {
        const fetch = async () => {
            await getClassList().then((res) => {
                if (res.data) {
                    console.log('data', res.data);
                    setClassList(res.data);
                }
            });
        };

        fetch();
    }, []);

    const createOnClick = () => {
        window.location.href = '/classCreate';
    };
    const removeOnClick = () => {
        setIsRemoveClicked(true);
    };
    const submitOnClick = () => {
        setIsRemoveClicked(false);
    };

    return (
        <>
            {isRemoveClicked && (
                <BlurModal
                    innerDatas={
                        <>
                            {classList.map((element) => (
                                <ClassCard
                                    key={element.id}
                                    id={element.id}
                                    title={element.groupName}
                                    desc={element.description}
                                    code={element.groupCode}
                                    isRemove
                                    classList={classList}
                                    setClassList={setClassList}
                                />
                            ))}
                        </>
                    }
                    footerDatas={<ContainedButton btnType="primary" size="mid" text="완료" onClick={submitOnClick} />}
                />
            )}
            <ClassListPageLayout>
                <ClassListBox>
                    <ClassListHeader>
                        <ClassListTitle>나의 클래스</ClassListTitle>
                        <ClassListButtonBox>
                            <ContainedButton btnType="primary" size="mid" text="생성" onClick={createOnClick} />
                            <ContainedButton btnType="secondary" size="mid" text="삭제" onClick={removeOnClick} />
                        </ClassListButtonBox>
                    </ClassListHeader>
                    {classList.map((element) => (
                        <ClassCard
                            key={element.id}
                            id={element.id}
                            title={element.groupName}
                            desc={element.description}
                            code={element.groupCode}
                        />
                    ))}
                </ClassListBox>
            </ClassListPageLayout>
        </>
    );
};

export default ClassListPage;
