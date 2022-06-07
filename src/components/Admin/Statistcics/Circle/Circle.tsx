import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Circle = ({data}) => {
    return <Doughnut data={data} />;
}
export default Circle;
