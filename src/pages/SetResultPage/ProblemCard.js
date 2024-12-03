import React from 'react';
import styled from 'styled-components';
import { Circle, XMark } from '../../assets/icons';

const ProblemCardLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    padding: 12px 16px;
    margin: 5px 25px;
    border-radius: 5px;
    background-color: white;
`;
const TextBox = styled.div`
    text-align: start;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 16px;

    .text-answer {
        margin-bottom: 6px;
    }
`;
const AnswerBox = styled.div`
    flex-basis: 65%;
    text-align: start;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 16px;

    .text-answer {
        margin-bottom: 6px;
    }

    .wrong-answer {
        color: red;
    }
`;

const SimillarityBox = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 25px;
`;
const CorrectWrapper = styled.img``;

const ProblemCard = ({ studentAnswer, question, simillarity }) => {
    // 두 문장 비교해서 틀린 부분 찾기
    console.log('S', studentAnswer);
    console.log('q', question);
    const getHighlightedText = (studentAnswer, question) => {
        const result = [];
        if (studentAnswer && question) {
            const maxLength = Math.max(studentAnswer.length, question.length);

            for (let i = 0; i < maxLength; i++) {
                if (studentAnswer[i] !== question[i]) {
                    // 다른 글자에만 빨간색 스타일 적용
                    result.push(
                        <span key={i} style={{ color: 'red' }}>
                            {studentAnswer[i] || ''}
                        </span>
                    );
                } else {
                    // 동일한 글자는 기본 스타일
                    result.push(<span key={i}>{studentAnswer[i] || ''}</span>);
                }
            }
        }

        return result;
    };

    return (
        <ProblemCardLayout>
            <TextBox>
                <div className="text-answer" style={{ color: '#127FFF' }}>
                    정답
                </div>
                <div className="text-student">학생 답안</div>
            </TextBox>
            <AnswerBox>
                <div className="text-answer" style={{ color: '#127FFF' }}>
                    {question}
                </div>
                <div className="text-student">{studentAnswer ? getHighlightedText(studentAnswer, question) : ''}</div>
            </AnswerBox>
            <SimillarityBox>{simillarity}</SimillarityBox>
        </ProblemCardLayout>
    );
};

export default ProblemCard;
