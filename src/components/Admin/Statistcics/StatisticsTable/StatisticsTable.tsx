import React from 'react';
import { DataGrid, GridColDef} from '@material-ui/data-grid';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'rating',
        type: 'number',
        headerName: 'Rating',
        width: 120,
        editable: true,
    },
    {
        field: 'totalCompleted',
        headerName: 'Total Completed',
        type: 'number',
        width: 190,
        editable: true,
    },
    {
        field: 'totalNotCompleted',
        headerName: 'Total Not Completed',
        type: 'number',
        width: 210,
        editable: true,
    },
    {
        field: 'small',
        headerName: 'small',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'middle',
        headerName: 'middle',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'big',
        headerName: 'big',
        type: 'number',
        width: 100,
        editable: true,
    },

];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const StatisticsTable = ({data}) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
            />
        </div>
    );
}

export default StatisticsTable;