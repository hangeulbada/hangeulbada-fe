import React from 'react';
import styled from 'styled-components';
import { listenDone } from '../../assets/icons';

const StyledImgBox = styled.div`
    width: 100px;
    height: 100px;
`;

const StyledQuestBox = styled.div`
    display: flex;
    border-radius: 20px;
    background-color: pink;
    height: 100px;
    width:  100%;
    margin: 10px;
    align-items: center;
`;

const StyledBoxContent = styled.div`
    // display: flex;
    height: 80px;
    width: 80px;
    // background-color: yellow;
    // align-items: center;
    margin: 0px;
    font-size: 28px;
    text-align: center;
`;

const StyledBoxText = styled.div`
    margin: 15px 0;
`;
// num 문제 수
const QuestBox = ({ num }) => {
    return (
        <div>
            <StyledQuestBox>
                <StyledBoxContent>
                    <StyledBoxText>{num}번</StyledBoxText>
                </StyledBoxContent>
                <StyledBoxContent>
                    <StyledBoxText>
                        <StyledImgBox>
                            <img src={listenDone} alt="listenDone" />
                        </StyledImgBox>
                    </StyledBoxText>
                </StyledBoxContent>
            </StyledQuestBox>
        </div>
    );
};

export default QuestBox;
