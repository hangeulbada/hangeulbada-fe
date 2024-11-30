import React from 'react';
import styled from 'styled-components';
import { RemoveIcon } from '../../../assets/icons';
import { removeStuClass } from '../../../utils/api/student';
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
    .title {
        font-family: 'DXSamgakGimbap Bold';
        font-size: 18px;
        margin-bottom: 3px;
        text-align: start;
    }
    .desc {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        text-align: start;
    }
    &:hover {
        cursor: pointer;
    }
`;

const RemoveButton = styled.button`
    display: flex;
    align-items: center;
    border-width: 0;
    background-color: transparent;
    &:hover {
        cursor: pointer;
    }
`;

const IncorrectClassBox = ({ id, title, desc, isRemove, classList, setClassList, workbookIds }) => {
    const navigate = useNavigate();
    const removeOnClick = () => {
        const requestRemove = async (groupId) => {
            await removeStuClass(groupId).then((res) => {
                const filtered = classList.filter((value, idx, arr) => {
                    return value.id !== groupId;
                });
                setClassList(filtered);
                // console.log(classList);
            });
        };
        requestRemove(id);
    };
    const onClickClassBox = () => {
        navigate('/IncorrectSetListPage', { state: { id, title, workbookIds } });
    };
    return (
        <div>
            <ClassCardLayout>
                <ClassCardInformation onClick={onClickClassBox}>
                    <div className="title">{title}</div>
                    <div className="desc">{desc}</div>
                </ClassCardInformation>
                {isRemove && (
                    <RemoveButton onClick={removeOnClick}>
                        <img src={RemoveIcon} alt="removeIconImg" />
                    </RemoveButton>
                )}
            </ClassCardLayout>
        </div>
    );
};

export default IncorrectClassBox;
