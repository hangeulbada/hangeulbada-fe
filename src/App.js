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
} from './pages';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import styled from 'styled-components';

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
`;

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <BodyInner>
                    <WebAppContainer>
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<IntroPage />} />
                            <Route path="/main" element={<MainPage />} />
                            <Route path="/classList" element={<ClassListPage />} />
                            <Route path="/classEnter" element={<ClassEnterPage />} />
                            <Route path="/class" element={<ClassPage />} />
                            <Route path="/setList" element={<SetListPage />} />
                            <Route path="/set" element={<SetPage />} />
                            <Route path="/setResultPage" element={<SetResultPage />} />
                            <Route path="/classCreate" element={<ClassCreatePage />} />
                            <Route path="/StuSetListPage" element={<StuSetListPage />} />
                            <Route path="/testPage" element={<TestPage />} />
                        </Routes>
                    </WebAppContainer>
                </BodyInner>
            </BrowserRouter>
        </div>
    );
}

export default App;
