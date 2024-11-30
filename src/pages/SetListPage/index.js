import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SetCard from './SetCard';
import ContainedButton from '../../components/button/ContainedButton';
import BlurModal from '../../components/modal/BlurModal';
import { getSetList } from '../../utils/api/set';

const SetListPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const SetListBox = styled.div`
    margin: 10px 18px;
`;
const SetListHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 24px;
`;
const SetListTitle = styled.div`
    font-family: 'DXSamgakGimbap Medium';
    font-size: 24px;
`;
const SetListButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 45%;
`;

const SetListPage = () => {
    const [isRemoveClicked, setIsRemoveClicked] = useState(false);

    const [setList, setSetList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await getSetList().then((res) => {
                setSetList(res.data);
            });
        };

        fetch();
    }, []);

    const createOnClick = () => {
        window.location.href = '/shareQuestions';
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
                            {setList.map((set) => (
                                <SetCard
                                    key={set.id}
                                    id={set.id}
                                    title={set.title}
                                    desc={set.description}
                                    setList={setList}
                                    setSetList={setSetList}
                                    isRemove
                                />
                            ))}
                        </>
                    }
                    footerDatas={<ContainedButton btnType="primary" size="mid" text="완료" onClick={submitOnClick} />}
                />
            )}
            <SetListPageLayout>
                <SetListBox>
                    <SetListHeader>
                        <SetListTitle>나의 세트</SetListTitle>
                        <SetListButtonBox>
                            <ContainedButton btnType="primary" size="mid" text="생성" onClick={createOnClick} />
                            <ContainedButton btnType="secondary" size="mid" text="삭제" onClick={removeOnClick} />
                        </SetListButtonBox>
                    </SetListHeader>
                    {setList.map((set) => (
                        <SetCard key={set.id} id={set.id} title={set.title} desc={set.description} />
                    ))}
                </SetListBox>
            </SetListPageLayout>
        </>
    );
};

export default SetListPage;
