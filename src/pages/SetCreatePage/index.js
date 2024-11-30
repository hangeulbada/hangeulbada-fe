import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Counter from './components/Counter';
import StarDiff from './components/StarDiff';
import ContainedButton from '../../components/button/ContainedButton';
import SelectButton from './components/SelectButton';
import CreateQuestions from './CreateQuestions';
import { createQuestions } from '../../utils/api/question';
import { createSet } from '../../utils/api/set';
import LoadQuestions from './LoadQuestions';
import SelectAIQuestions from './SelectAIQuestions';
import { act } from 'react';
import CreateAiQuestions from './CreateAiQuestions';

const SetCreatePageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const HeaderBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 60px;
    margin-bottom: 0px;
    border-radius: 10px;
    background-color: transparent;
    font-family: 'DXSamgakGimbap Medium';
    font-size: 24px;
`;
const SetInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 30px;
    margin: 24px;
    border-radius: 10px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 20px;
    background-color: white;
`;
const SetTitle = styled.div`
    display: flex;
    margin-bottom: 30px;
    .title {
        margin-right: 12px;
    }
`;
const SetDesc = styled.div`
    display: flex;
    margin-bottom: 30px;
    .desc {
        margin-right: 12px;
    }
`;
const InputContainer = styled.input`
    font-family: 'DXSamgakGimbap Light';
    font-size: 20px;
    border: none;
    outline: none;
    background-color: transparent;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const QuestionCount = styled.div`
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    .count {
        margin-right: 12px;
    }
`;
const Difficulty = styled.div`
    display: flex;
    align-items: center;
    .diff {
        margin-right: 12px;
    }
`;
const CreateLayout = styled.div`
    display: flex;
    flex-direction: column;
    .create-button {
        margin-right: 30px;
        margin-bottom: 14px;
        align-self: flex-end;
    }
`;
const LoadLayout = styled.div`
    display: flex;
    flex-direction: column;
    .load-button {
        margin-right: 30px;
        margin-bottom: 14px;
        align-self: flex-end;
    }
`;
const TextBox = styled.div`
    .selected {
        margin-top: 8px;
        font-family: 'DXSamgakGimbap Light';
        font-size: 15px;
        color: #515151;
    }
`;
const SetCreatePage = () => {
    const [steps, setSteps] = useState(0);
    // steps === 0
    const [setName, setSetName] = useState();
    const [setDesc, setSetDesc] = useState();
    const [count, setCount] = useState(10);
    const [diff, setDiff] = useState(0);
    const [zeroFulfilled, setZeroFulfilled] = useState(false);
    // steps === 1
    const [action, setAction] = useState();
    //steps === 2
    const [workbookId, setWorkbookId] = useState();
    const [inputValue, setInputValue] = useState([]);
    const [selectFulfilled, setSelectFulfilled] = useState(false);
    const [writeFulfilled, setWriteFulfiiled] = useState(false);
    const [selectAI, setSelectAI] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [aiAction, setAiAction] = useState();
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString());

    useEffect(() => {
        const interval = setInterval(() => {
            // 매 초마다 현재 시간을 업데이트합니다.
            setCurrentDateTime(new Date().toISOString());
        }, 1000);

        // 컴포넌트가 언마운트 될 때 인터벌을 정리합니다.
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (setName && setDesc !== 0) {
            setZeroFulfilled(true);
        } else {
            setZeroFulfilled(false);
        }
    }, [setName, setDesc]);

    useEffect(() => {
        if (inputValue.length === count) {
            setSelectFulfilled(true);
        } else {
            setSelectFulfilled(false);
        }
    }, [inputValue]);

    useEffect(() => {
        if (inputValue.includes('') || inputValue.length !== count) {
            setWriteFulfiiled(false);
        } else {
            setWriteFulfiiled(true);
        }
    }, [inputValue]);

    const createSetOnClick = () => {
        const createSetApi = async (setName, setDesc, count, sDate, eDate) => {
            await createSet(setName, setDesc, count, sDate, eDate).then((res) => {
                setWorkbookId(res.data.id);
            });
        };

        createSetApi(setName, setDesc, count, currentDateTime, currentDateTime);
        setSteps(steps + 1);
    };

    let bodyContent = (
        <>
            <SetInformation>
                <SetTitle>
                    <div className="title">세트 이름</div>
                    <InputContainer
                        type="text"
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                        placeholder="세트1"
                    />
                </SetTitle>
                <SetDesc>
                    <div className="desc">세트 설명</div>
                    <InputContainer
                        type="text"
                        value={setDesc}
                        onChange={(e) => setSetDesc(e.target.value)}
                        placeholder="세트에 관한 설명 작성"
                    />
                </SetDesc>
                <QuestionCount>
                    <div className="count">문제 수</div>
                    <Counter count={count} setCount={setCount} />
                </QuestionCount>
                {/* <Difficulty>
                    <div className="diff">세트 난이도</div>
                    <StarDiff diff={diff} setDiff={setDiff} />
                </Difficulty> */}
            </SetInformation>
            <ButtonContainer>
                <ContainedButton
                    onClick={createSetOnClick}
                    btnType="primary"
                    size="mid"
                    text="다음"
                    disabled={!zeroFulfilled}
                />
            </ButtonContainer>
        </>
    );

    if (steps === 1) {
        console.log('Step', steps);
        console.log('Action', action);
        bodyContent = (
            <>
                <SelectButton action={action} setAction={setAction} />
                <ButtonContainer>
                    <ContainedButton
                        onClick={() => setSteps(steps + 1)}
                        btnType="primary"
                        size="mid"
                        text="다음"
                        disabled={!action}
                    />
                </ButtonContainer>
            </>
        );
    }

    const createOnClick = () => {
        const fetch = async (workbookId, inputValue, selectedTags) => {
            // 문제와 태그 배열을 조합하여 새로운 객체 배열을 생성
            const questions = inputValue.map((content, index) => ({
                content: content,
                // difficulty: diff, // 문제 난이도
                tags: selectedTags[index], // 각 문제에 해당하는 태그 배열
            }));
            await createQuestions(workbookId, questions).then((res) => {
                window.location.href = '/setList';
            });
        };
        fetch(workbookId, inputValue, selectedTags);
    };
    console.log(selectedTags);

    if (steps === 2) {
        console.log('step', steps);

        if (action === 'create') {
            bodyContent = (
                <>
                    <SelectAIQuestions aiAction={aiAction} setAiAction={setAiAction} />
                    <ButtonContainer>
                        <ContainedButton
                            onClick={() => setSteps(steps + 1)}
                            btnType="primary"
                            size="mid"
                            text="다음"
                            disabled={!aiAction}
                        />
                    </ButtonContainer>
                </>
            );
        } else if (action === 'load') {
            bodyContent = (
                <LoadLayout>
                    <div className="load-button">
                        <ContainedButton
                            onClick={createOnClick}
                            btnType="primary"
                            size="mid"
                            text="생성"
                            disabled={!selectFulfilled}
                        />
                    </div>
                    <LoadQuestions inputValue={inputValue} setInputValue={setInputValue} />
                </LoadLayout>
            );
        }
    }

    if (steps === 3) {
        console.log('step', steps);
        console.log('action', action);

        switch (aiAction) {
            case 'load':
                bodyContent = (
                    <LoadLayout>
                        <div className="load-button">
                            <ContainedButton
                                onClick={createOnClick}
                                btnType="primary"
                                size="mid"
                                text="생성"
                                disabled={!selectFulfilled}
                            />
                        </div>
                        <LoadQuestions inputValue={inputValue} setInputValue={setInputValue} />
                    </LoadLayout>
                );
                break;

            case 'self':
                bodyContent = (
                    <CreateLayout>
                        <div className="create-button">
                            <ContainedButton
                                onClick={createOnClick}
                                btnType="primary"
                                size="mid"
                                text="완료"
                                disabled={!writeFulfilled}
                            />
                        </div>

                        <CreateQuestions
                            count={count}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />
                    </CreateLayout>
                );
                break;

            case 'AI':
                bodyContent = (
                    /*AI 문제 생성 클릭 시 화면 코드 */
                    <>
                        <CreateAiQuestions count={count} diff={diff} workbookId={workbookId} />
                    </>
                );
                break;
        }
    }

    return (
        <SetCreatePageLayout>
            <HeaderBox>
                {action === 'load' && steps === 2 ? (
                    <TextBox>
                        <div>기존 문장에서 가져오기</div>
                        <div className="selected">현재 {inputValue.length}개 선택됨</div>
                    </TextBox>
                ) : (
                    <div>새로운 세트 만들기</div>
                )}
            </HeaderBox>
            {bodyContent}
        </SetCreatePageLayout>
    );
};

export default SetCreatePage;
