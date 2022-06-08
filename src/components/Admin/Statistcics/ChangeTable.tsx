import React, {useState} from 'react';
import SortBy from "./SortBy";
import StatisticsContainer from "./Statistics/StatisticsContainer";
import CircleContainer from "./Circle/CircleContainer";
import RatingContainer from "./Rating/RatingContainer";

export interface MyTable {
    id: number,
    name: string
}

const tables: MyTable[] = [{id: 1, name: 'Cities Master'}, {id: 2, name: 'Circle'}, {id: 3, name: 'Rating'}]

const ChangeTable = () => {
    const [correctTable, setCorrectTable] = useState<MyTable>(tables[1])
    return (
        <SortBy setCorrectTable={setCorrectTable} tables={tables}>
            {correctTable.name === "Cities Master"
                ? <StatisticsContainer/>
                :correctTable.name === "Circle"
                ? <CircleContainer/>
                :<RatingContainer/>
            }
        </SortBy>
    );
};

export default ChangeTable;