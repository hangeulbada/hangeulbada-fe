import React from 'react';
import styled from 'styled-components';
// import { RemoveIcon } from '../../assets/icons';
// import { removeStuClass } from '../../utils/api/student';
import { useNavigate } from 'react-router-dom';

const ClassCardLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin: 12px 15px;
    border-radius: 14px;
    background-color: white;
`;

const ClassCardInformation = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    .titleDiv {
        display: flex;
        flex-direction: row;
    }

    .title {
        font-family: 'DXSamgakGimbap Bold';
        font-size: 18px;
        margin-bottom: 3px;
    }
    .title2 {
        font-family: 'DXSamgakGimbap Bold';
        font-size: 18px;
        margin-bottom: 3px;
        margin-left: 15px;
    }
    .desc {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
    }
    .desc2 {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        text-align: left;
        margin-left: 20px;
    }
    &:hover {
        cursor: pointer;
    }
`;

const ResultButton = styled.div`
    background-color: #ffd912;
    width: 87px;
    height: 32px;
    /* z-index: 100; */
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 0;
    border-radius: 5px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 13px;

    &:hover {
        cursor: pointer;
    }
`;

const StuSetResultBox = ({ id, title, desc, workbookId, assignmentId }) => {
    const navigate = useNavigate();

    const onClickClassBox = () => {
        navigate('/MyResultPage', { state: { id, title } });
    };

    const onClickLookTestResult = () => {
        navigate(`/MyResultPage/${workbookId}/${assignmentId}`, {
            state: {
                wid: workbookId,
                assignid: assignmentId,
                workbookTitle: title,
            },
        });
    };

    return (
        <div>
            <ClassCardLayout>
                <ClassCardInformation>
                    <div className="titleDiv">
                        <div className="title">세 트 명 </div>

                        <div className="title2">{title}</div>
                    </div>
                    <div className="titleDiv">
                        <div className="desc">내 점 수</div>
                        <div className="desc2">{desc}</div>
                    </div>
                </ClassCardInformation>
                <ResultButton onClick={onClickLookTestResult}>시험지 보기</ResultButton>
            </ClassCardLayout>
        </div>
    );
};

export default StuSetResultBox;
