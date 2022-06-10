import React, {useState} from 'react';
import SortBy from "./SortBy";
import StatisticsContainer from "./Statistics/StatisticsContainer";
import CircleContainer from "./Circle/CircleContainer";
import StatisticsTableContainer from "./StatisticsTable/StatisticsTableContainer";

export interface MyTable {
    id: number,
    name: string
}

const tables: MyTable[] = [
    {id: 1, name: 'Count orders of masters'},
    {id: 2, name: 'Counting orders by city'},
    {id: 3, name: 'Masters rating'},
    {id: 4, name: 'Statistic table'}
]

const ChangeTable = () => {
    const [correctTable, setCorrectTable] = useState<MyTable>(tables[1])
    return (
        <SortBy setCorrectTable={setCorrectTable} correctTable={correctTable} tables={tables}>
            {correctTable.name === "Count orders of masters"
                ? <StatisticsContainer/>
                : correctTable.name === "Counting orders by city"
                    ? <CircleContainer link='getOrdersByCities'/>
                    : correctTable.name === "Masters rating"
                        ? <CircleContainer link='getRatingByMaster'/>
                        : <StatisticsTableContainer/>
            }
        </SortBy>
    );
};

export default ChangeTable;