import React, { useState } from 'react';
import styled from 'styled-components';

import ClassCard from './ClassCard';
import ContainedButton from '../../components/button/ContainedButton';
import BlurModal from '../../components/modal/BlurModal';


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

  const dummies = [
    {
      title: 'title1',
      desc: 'desc1',
      code: 'code1',
    },
    {
      title: 'title2',
      desc: 'desc2',
      code: 'code2',
    },
    {
      title: 'title3',
      desc: 'desc3',
      code: 'code3',
    },
    {
      title: 'title4',
      desc: 'desc4',
      code: 'code4',
    },
  ];

  const createOnClick = () => {
    window.location.href = "/classCreate";
  }
  const removeOnClick = () => {
    setIsRemoveClicked(true);
  }
  const submitOnClick = () => {
    setIsRemoveClicked(false);
  }

  return (
    <>
      {isRemoveClicked && (
        <BlurModal 
          innerDatas={
            <>
              {dummies.map((dummy) => (
                <ClassCard key={dummy.title} title={dummy.title} desc={dummy.desc} code={dummy.code} isRemove />
              ))}
              <ContainedButton btnType="primary" size="mid" text="완료" onClick={submitOnClick}/>
            </>
          }
        />
      )}
      <ClassListPageLayout>
        <ClassListBox>
          <ClassListHeader>
            <ClassListTitle>나의 클래스</ClassListTitle>
            <ClassListButtonBox>
              <ContainedButton 
                btnType="primary" 
                size="mid" 
                text="생성" 
                onClick={createOnClick}
              />
              <ContainedButton 
                btnType="secondary" 
                size="mid" 
                text="삭제" 
                onClick={removeOnClick}
              />
            </ClassListButtonBox>
          </ClassListHeader>
          {dummies.map((dummy) => (
            <ClassCard key={dummy.title} title={dummy.title} desc={dummy.desc} code={dummy.code} />
          ))}
        </ClassListBox>
      </ClassListPageLayout>
    </>
    );
};

export default ClassListPage;
