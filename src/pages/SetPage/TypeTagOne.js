import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    width: 470px;
    /* margin-right: 10px; */
    margin-bottom: 8px;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    // 스크롤바 트랙 (바가 움직이는 배경 부분)
    &::-webkit-scrollbar-track {
        background: #f1f1f1; // 트랙의 배경 색상
        border-radius: 10px; // 스크롤바 둥근 모서리
        width: 10px;
    }
    // 스크롤바 핸들 (움직이는 부분)
    &::-webkit-scrollbar-thumb {
        background: #888; // 스크롤바 색상
        border-radius: 10px; // 스크롤바 둥근 모서리
    }
`;

const Tag = styled.div`
    min-width: 90px;
    min-height: 33px;
    width: 90px;
    color: #ffffff;
    border-radius: 20px;
    background-color: #d9d9d9;
    opacity: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 15px;
    cursor: pointer;

    &.selected {
        background-color: #127fff;
        opacity: 80%;
    }
`;

const TypeTagOne = ({ key, selectedTag, setSelectedTag }) => {
    const tags = ['구개음화', '연음화', '경음화', '유음화', '비음화', '기식음화', '겹받침', '음운규칙x'];
    // const [selectTags, setSelectTags] = useState([]);

    const onClickTag = (tag) => {
        // 이미 선택된 태그를 다시 클릭하면 선택 해제
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };

    return (
        <div>
            <TagContainer>
                {tags.map((tag) => (
                    <Tag key={tag} onClick={() => onClickTag(tag)} className={selectedTag === tag ? 'selected' : ''}>
                        {tag}
                    </Tag>
                ))}
            </TagContainer>
        </div>
    );
};

export default TypeTagOne;
