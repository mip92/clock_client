import React, {useState} from 'react';
import SortBy from "./SortBy";
import StatisticsContainer from "./Statistics/StatisticsContainer";
import CircleContainer from "./Circle/CircleContainer";

export interface MyTable {
    id: number,
    name: string
}

const tables: MyTable[] = [{id: 1, name: 'Cities Master'}, {id: 2, name: 'Circle'}]

const ChangeTable = () => {
    const [correctTable, setCorrectTable] = useState<MyTable>(tables[1])
    return (
        <SortBy setCorrectTable={setCorrectTable} tables={tables}>
            {correctTable.name === "Cities Master"
                ? <StatisticsContainer/>
                : <CircleContainer/>
            }
        </SortBy>
    );
};

export default ChangeTable;