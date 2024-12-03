import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

// 필요한 요소와 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartContainer = styled.div`
    margin-top: 5%;
`;

const StatPieChart = ({ stat }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (stat && stat.length > 0) {
            const labels = stat.map((item) => item.tag);
            const counts = stat.map((item) => item.count);
            const total = counts.reduce((sum, count) => sum + count, 0);
            const percentages = counts.map((count) => (total > 0 ? Math.round((count / total) * 1000) / 10 : 0));

            console.log('labels', labels);
            console.log('percentages', percentages);

            // Chart.js 데이터 설정
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: '오답율',
                        data: percentages,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40',
                            '#C9CBCF',
                            '#74DADA',
                        ],
                        hoverOffset: 4,
                    },
                ],
            });
        }
    }, [stat]); // stat이 변경될 때마다 실행

    const labelPlugin = {
        id: 'labelPlugin',
        afterDraw: (chart) => {
            const { ctx, chartArea } = chart;
            const { datasets } = chart.data;
            const dataset = datasets[0];

            chart.data.labels.forEach((label, index) => {
                const meta = chart.getDatasetMeta(0);
                const arc = meta.data[index];
                const { x, y } = arc.tooltipPosition();

                const percentage = dataset.data[index]; // 퍼센트 값
                if (percentage <= 0) return; // 0%일 경우 텍스트 출력 안 함

                const line1 = label; // 첫 번째 줄: 라벨명
                const line2 = `${percentage}%`; // 두 번째 줄: 퍼센트
                // 텍스트 스타일 설정
                ctx.save();
                ctx.font = '17px DXSamgakGimbap Light ';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                //텍스트 출력
                // 첫 번째 줄 (라벨명)
                ctx.fillText(line1, x, y - 10); // y 좌표를 조정하여 위로 올림

                // 두 번째 줄 (퍼센트)
                ctx.fillText(line2, x, y + 10); // y 좌표를 조정하여 아래로 내림

                ctx.restore();
            });
        },
    };

    return (
        <PieChartContainer>
            {chartData ? (
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                            tooltip: {
                                enabled: false,
                            },
                        },
                    }}
                    plugins={[labelPlugin]}
                />
            ) : (
                <p>Loading...</p>
            )}
        </PieChartContainer>
    );
};

export default StatPieChart;
