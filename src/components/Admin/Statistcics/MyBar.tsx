import React from 'react';
import {Bar} from "react-chartjs-2";
import {options} from "./Statistics";

const MyBar = ({myData}) => {
    return (
        <div>
            <Bar options={options} data={myData}/>
        </div>
    );
};

export default MyBar;