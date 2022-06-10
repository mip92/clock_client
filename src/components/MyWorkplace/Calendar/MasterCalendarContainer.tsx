import React, {useState} from 'react';
import MasterCalendarMonth from "./MasterCalendarMonth";
import {Button} from "@material-ui/core";
import MasterCalendarWeek from "./MasterCalendarWeek";

enum FORMAT{
    Week,
    Month
}
const formats=[
    {id:1, format:FORMAT["Week"]},
    {id:2, format: FORMAT['Month']}
]
const MasterCalendarContainer = () => {
    const [correctFormat, setCorrectFormat]=useState(formats[1])
    const handlerChangeFormat=(format)=>{
        setCorrectFormat(format)
    }
    console.log(correctFormat)
    return (
        <div>
            {formats.map((format)=><Button onClick={()=>handlerChangeFormat(format)} key={format.id}>{FORMAT[format.format]}</Button>)}
            {correctFormat.format===FORMAT.Month && <MasterCalendarMonth/>}
            {correctFormat.format===FORMAT.Week && <MasterCalendarWeek/>}
        </div>
    );
};

export default MasterCalendarContainer;