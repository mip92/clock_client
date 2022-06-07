import React from 'react';
import {Button} from "@material-ui/core";
import {MyTable} from "./ChamgeTable";

interface SortByProps{
    setCorrectTable: React.Dispatch<React.SetStateAction<MyTable>>,
    tables :MyTable[]
}

const SortBy:React.FC<SortByProps> = ({children, setCorrectTable, tables}) => {

const changeStatisticTable=(table)=>{
    setCorrectTable(table)
}
    return (
        <div>
            {tables.map(table => <Button key={table.id} onClick={()=>changeStatisticTable(table)}>{table.name}</Button>)}
            {children}
        </div>
    );
};

export default SortBy;