import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyCalendar from './MyCalendar';
import { getClassList } from '../../utils/api/class';
import { getWBOfStudent } from '../../utils/api/student';
import Chart from './Chart';
import ContainedButton from '../../components/button/ContainedButton';
import SelectMyPageButton from './SelectMyPageButton';

const MyPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
`;
const MyPageTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    margin: 30px 0 10px 30px;
    font-family: 'DXSamgakGimbap Bold';
`;

const StyledButtonSection = styled.div`
    display: flex;
    padding: 10px;
    margin-left: 17%;
`;
const MyPage = () => {
    const [stuGroupList, setStuGroupIdList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getClassList();
                const ids = res.data.map((item) => item.id);
                setStuGroupIdList(ids);
                console.log('res', res);
            } catch (error) {
                console.log('Error: ', error);
            }
        };
        fetch();
    }, []);

    // const [date, setDate] = useState(7);

    // const on30Clicked = () => {
    //     setDate(30);
    // };
    // const on15Clicked = () => {
    //     setDate(15);
    // };
    // const on7Clicked = () => {
    //     setDate(7);
    // };

    return (
        <MyPageLayout>
            <MyPageTitle>마이페이지</MyPageTitle>
            <SelectMyPageButton />
        </MyPageLayout>
    );

    // return (
    //   <MyPageLayout>
    //     <MyPageTitle>나의 결과</MyPageTitle>
    //     <StyledButtonSection>
    //       <div style={{ margin: '5px' }}>
    //         <ContainedButton btnType="primary" size="mid" text="30일" onClick={on30Clicked}></ContainedButton>
    //       </div>
    //       <div style={{ margin: '5px' }}>
    //         <ContainedButton btnType="primary" size="mid" text="15일" onClick={on15Clicked}></ContainedButton>
    //       </div>
    //       <div style={{ margin: '5px' }}>
    //         <ContainedButton btnType="primary" size="mid" text="7일" onClick={on7Clicked}></ContainedButton>
    //       </div>
    //     </StyledButtonSection>

    //     <div style={{ backgroundColor: 'white', borderRadius: '20px', margin: '30px' }}>
    //       <Chart groupIds={stuGroupList[0]} date={date} />
    //     </div>
    //   </MyPageLayout>
    // );
};

export default MyPage;
