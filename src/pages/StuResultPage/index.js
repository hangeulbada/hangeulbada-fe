// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import QuesBox from './QuesBox';
// import { StarIcon } from '../../assets/icons';
// import ContainedButton from '../../components/button/ContainedButton';
// import { useLocation } from 'react-router-dom';
// import { getSet, getSetListByWBId } from '../../utils/api/set';
// import { useOAuthState } from '../../utils/store/useLoginStore';
// import { getQuestionsInSet } from '../../utils/api/question';

// const SetResultPageLayout = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   min-height: 100vh;
//   position: relative;
// `;

// const SetInformation = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: start;
//   padding: 16px;
//   margin: 24px;
//   border-radius: 10px;
//   font-size: 24px;
//   background-color: rgba(18, 127, 255, 0.27);

//   .title {
//     font-family: 'DXSamgakGimbap Medium';
//     font-size: 24px;
//   }
//   .description {
//     font-family: 'DXSamgakGimbap Light';
//     font-size: 16px;
//   }
//   .count {
//     font-family: 'DXSamgakGimbap Light';
//     font-size: 16px;
//   }
//   .difficulty {
//     font-family: 'DXSamgakGimbap Light';
//     font-size: 16px;
//   }
// `;
// const SetHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-right: 24px;
//   margin-left: 24px;
//   margin-bottom: 12px;
// `;
// const NameAndButtonBox = styled.div`
//   .name {
//     text-align: start;
//     margin-bottom: 12px;
//     font-family: 'DXSamgakGimbap Bold';
//     font-size: 24px;
//   }
// `;
// const ScoreBox = styled.div`
//   display: flex;
//   align-items: center;
//   .text {
//     font-family: 'DXSamgakGimbap Medium';
//     font-size: 20px;
//     margin-right: 8px;
//     background-color: transparent;
//   }
//   .score {
//     font-family: 'DXSamgakGimbap Medium';
//     font-size: 24px;
//     width: 62px;
//     height: 57px;
//     line-height: 57px;
//     border-radius: 5px;
//     background-color: white;
//   }
// `;

// const StuResultPage = () => {
//   const location = useLocation();
//   const { workbookId, OCRres } = location.state || {};
//   const [stuSet, setStuSet] = useState([]);
//   const { cid, name } = useOAuthState();
//   const [setInfo, setSetInfo] = useState([]);
//   const [combinedData, setCombinedData] = useState([]);

//   useEffect(() => {
//     console.log('Received OCR results:', OCRres);
//   }, [workbookId, OCRres]);

//   useEffect(() => {
//     const fetch = async () => {
//       await getSetListByWBId(workbookId).then((res) => {
//         setStuSet(res);
//       });
//     };
//     fetch();
//   }, [workbookId]);

//   useEffect(() => {
//     const getSetInfo = async () => {
//       await getSet(workbookId).then((res) => {
//         console.log('getsetinfo', res);

//         setSetInfo(res.data);
//       });
//     };
//     getSetInfo();
//   }, [workbookId]);

//   useEffect(() => {
//     if (stuSet.data) {
//       const d = stuSet.data.map((question, index) => ({
//         ...question,
//         correct: OCRres[index]?.correct,
//       }));

//       setCombinedData(d);
//     }
//   }, [stuSet, OCRres]);

//   const trueCount = combinedData.reduce((count, item) => {
//     return count + (item.correct === true ? 1 : 0);
//   }, 0);

//   const totalScore = (trueCount / setInfo.questionNum) * 100;

//   return (
//     <SetResultPageLayout>
//       <SetInformation key={setInfo.id}>
//         <div className="title">{setInfo.title}</div>
//         <div className="description">{setInfo.description}</div>
//         <div className="count">문제 수 &nbsp;{setInfo.questionNum}</div>
//         <div className="difficulty">
//           난이도 &nbsp; {setInfo.difficulty} <img src={StarIcon} alt={'star'} />
//         </div>
//       </SetInformation>

//       <SetHeader>
//         <NameAndButtonBox>
//           <div className="name">{name}</div>
//           <ContainedButton btnType="primary" size="large" text="제출한 이미지 보기" onClick={() => {}} />
//         </NameAndButtonBox>
//         <ScoreBox>
//           <div className="text">총점</div>
//           <div className="score">{totalScore}</div>
//         </ScoreBox>
//       </SetHeader>
//       {combinedData.map((res, index) => (
//         <QuesBox studentAnswer={res.content} answer={res.content} key={index} correct={res.correct}></QuesBox>
//       ))}
//     </SetResultPageLayout>
//   );
// };

// export default StuResultPage;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProblemCard from '../SetResultPage/ProblemCard';
import { StarIcon } from '../../assets/icons';
import ContainedButton from '../../components/button/ContainedButton';
import BlurModal from '../../components/modal/BlurModal';
import { useOAuthState } from '../../utils/store/useLoginStore';
import { getSet } from '../../utils/api/set';
import { getStudentAnswer } from '../../utils/api/student';
import Stars from '../../components/banner/Stars';
import { useLocation } from 'react-router-dom';
import { getClassSet } from '../../utils/api/class';

const SetResultPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;

const SetInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 16px;
    margin: 24px;
    border-radius: 10px;
    font-size: 24px;
    background-color: rgba(18, 127, 255, 0.27);

    .title {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 24px;
        margin-bottom: 8px;
    }
    .description {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        margin-bottom: 8px;
    }
    .count {
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        margin-bottom: 8px;
    }
    .difficulty {
        display: flex;
        align-items: center;
        .text {
            margin-right: 12px;
        }
        font-family: 'DXSamgakGimbap Light';
        font-size: 16px;
        margin-bottom: 8px;
    }
`;
const SetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 24px;
    margin-left: 24px;
    margin-bottom: 12px;
`;
const NameAndButtonBox = styled.div`
    .name {
        text-align: start;
        margin-bottom: 12px;
        font-family: 'DXSamgakGimbap Bold';
        font-size: 24px;
    }
`;
const ScoreBox = styled.div`
    display: flex;
    align-items: center;
    .text {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 20px;
        margin-right: 8px;
        background-color: transparent;
    }
    .score {
        font-family: 'DXSamgakGimbap Medium';
        font-size: 24px;
        width: 62px;
        height: 57px;
        line-height: 57px;
        border-radius: 5px;
        background-color: white;
    }
`;

const StuResultPage = () => {
    // const { wid, sid } = useParams();

    const location = useLocation();
    const { workbookId, groupId } = location.state || {};

    const setInitialState = {
        title: '',
        description: '',
        questionNum: '',
    };
    const answerInitialState = {
        studentName: '',
        imgS3Url: '',
        answers: [],
        score: '',
    };

    const [openImage, setOpenImage] = useState(false);
    const [setData, setSetData] = useState(setInitialState);
    const [answerData, setAnswerData] = useState(answerInitialState);
    const [defaultData, setDefaultData] = useState();
    const [myId, setMyId] = useState();
    const [answerLength, setAnswerLength] = useState(0);

    // useEffect(() => {
    //   const getdefaultData = async () => {
    //     await getClassSet(groupId).then((res) => {
    //       setDefaultData(res.data);
    //       // setMyId(res.data[0].studentId)
    //       // console.log('res: ', defaultData[0].studentId);
    //       // const sample =  defaultData[0].studentId;
    //       // setMyId(sample);
    //     });
    //   };
    //   getdefaultData();
    // }, [myId]);

    useEffect(() => {
        const getSetData = async () => {
            await getClassSet(groupId).then((res) => {
                setDefaultData(res.data.filter((item) => item != null));
                console.log('defalutData:', res.data);
                console.log(res.data[0].studentId);
                setMyId(res.data[0].studentId);
                // // console.log('plz', plz);
                // setMyId(plz);
            });
            await getSet(workbookId).then((res) => {
                setSetData(res.data);
                // console.log('Getset', setData);
            });
            if (myId) {
                await getStudentAnswer(workbookId, myId).then((res) => {
                    console.log('answer', res.data);
                    setAnswerData(res.data);
                    setAnswerLength(res.data.answers.length);
                    console.log('ll', answerLength);
                });
            }
        };
        getSetData();
    }, [myId]);

    return (
        <>
            {openImage && (
                <BlurModal
                    innerDatas={
                        <div onClick={() => setOpenImage(false)}>
                            <img
                                className="blur-image"
                                src={process.env.REACT_APP_S3_URL + answerData.imgS3Url}
                                alt="answerImage"
                            />
                        </div>
                    }
                />
            )}
            <SetResultPageLayout>
                <SetInformation>
                    <div className="title">{setData.title}</div>
                    <div className="description">{setData.description}</div>
                    <div className="count">문제 수 {setData.questionNum}</div>
                    <div className="difficulty">
                        <div className="text">난이도</div>
                        <Stars difficulty={setData.difficulty} />
                    </div>
                </SetInformation>
                <SetHeader>
                    <NameAndButtonBox>
                        <div className="name">{answerData.studentName}</div>
                        <ContainedButton
                            btnType="primary"
                            size="large"
                            text="제출한 이미지 보기"
                            onClick={() => setOpenImage(true)}
                        />
                    </NameAndButtonBox>
                    <ScoreBox>
                        <div className="text">맞은 개수</div>
                        <div className="score">
                            {answerData.score}/{answerLength}
                        </div>
                    </ScoreBox>
                </SetHeader>
                {answerData?.answers.map((answer, idx) => (
                    <ProblemCard
                        key={idx}
                        studentAnswer={answer.ocr_answer}
                        question={answer.questionFull}
                        analysis={answer.anlysis}
                        simillarity={answer.simillarity}
                    />
                ))}
            </SetResultPageLayout>
        </>
    );
};

export default StuResultPage;
