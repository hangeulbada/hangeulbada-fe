import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {
    IntroPage,
    MainPage,
    ClassListPage,
    ClassEnterPage,
    ClassPage,
    SetListPage,
    SetPage,
    SetResultPage,
    ClassCreatePage,
    StuSetListPage,
    TestPage,
    MyPage,
    StuResultPage,
    ShowPastTestPage,
    IntroSelectRolePage,
    SetCreatePage,
    ClassSetListPage,
} from './pages';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styled from 'styled-components';

import { BackgroundImage } from './assets/images';
import { introBk } from './assets/images';
import ShareQuestions from './pages/SetCreatePage/ShareQuestions';
import CreateQuestions from './pages/SetCreatePage/CreateQuestions';
import Loading from './components/loading/Loading';
import MyResults from './pages/MyPage/MyResults';
import StuIncorrectSet from './pages/MyPage/StuIncorrectSet';
import IncorrectSetListPage from './pages/MyPage/IncorrectSetListPage';
import MyResultPage from './pages/MyPage/MyResultPage';

const BodyInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: gray;
`;
const WebAppContainer = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100%;
    background-color: white;
    background-image: url(${BackgroundImage});
    background-size: cover;
`;

const IntroContainer = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100%;
    background-color: white;
    background-image: url(${introBk});
    background-size: cover;
`;

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <BodyInner>
                    <IntroContainer>
                        <Routes>
                            <Route exact path="/" element={<IntroPage />} />
                            <Route exact path="/selectRole" element={<IntroSelectRolePage />} />
                        </Routes>
                    </IntroContainer>

                    <WebAppContainer>
                        <Navbar />
                        <Routes>
                            <Route path="/main" element={<MainPage />} />
                            <Route path="/classList" element={<ClassListPage />} />
                            <Route path="/classEnter" element={<ClassEnterPage />} />
                            <Route path="/class/:id" element={<ClassPage />} />
                            <Route path="/setList" element={<SetListPage />} />
                            <Route path="/set/:id" element={<SetPage />} />
                            <Route path="/setResultPage/:wid/:sid" element={<SetResultPage />} />
                            <Route path="/classCreate" element={<ClassCreatePage />} />
                            <Route path="/StuSetListPage" element={<StuSetListPage />} />
                            <Route path="/testPage" element={<TestPage />} />
                            <Route path="/MyPage" element={<MyPage />} />
                            <Route path="/stuResult" element={<StuResultPage />} />
                            <Route path="/showPastTestPage" element={<ShowPastTestPage />} />
                            <Route path="/setCreate" element={<SetCreatePage />} />
                            <Route path="/classSetList/:id" element={<ClassSetListPage />} />
                            <Route path="/shareQuestions" element={<ShareQuestions />} />
                            <Route path="/createQuestions" element={<CreateQuestions />} />
                            <Route path="/MyPage/results" element={<MyResults />} />
                            <Route path="/MyPage/incorrect" element={<StuIncorrectSet />} />
                            <Route path="/IncorrectSetListPage" element={<IncorrectSetListPage />} />
                            <Route path="/MyResultPage/:workbookId/:assignmentId" element={<MyResultPage />} />
                        </Routes>
                    </WebAppContainer>
                </BodyInner>
            </BrowserRouter>
        </div>
    );
}

export default App;
