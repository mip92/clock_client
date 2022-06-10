import React from 'react';
import {Button} from "@material-ui/core";
import {MyTable} from "./ChangeTable";
import s from "../../../style/SortBy.module.css";
interface SortByProps{
    setCorrectTable: React.Dispatch<React.SetStateAction<MyTable>>,
    tables :MyTable[],
    correctTable: MyTable
}

const SortBy:React.FC<SortByProps> = ({children, setCorrectTable, tables, correctTable}) => {

const changeStatisticTable=(table)=>{
    setCorrectTable(table)
}

    return (
        <div className={s.wrapper}>
            <div className={s.item}>
                {tables.map(table => <Button className={s.itemBtn} variant={correctTable.id==table.id ? 'contained': 'outlined'} color={correctTable.id==table.id ? 'primary': 'default'} key={table.id} onClick={()=>changeStatisticTable(table)}>{table.name}</Button>)}
            </div>
            {children}
        </div>
    );
};

export default SortBy;