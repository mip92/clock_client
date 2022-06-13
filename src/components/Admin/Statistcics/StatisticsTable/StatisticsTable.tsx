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
        headerName: 'Small',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'middle',
        headerName: 'Middle',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'big',
        headerName: 'Big',
        type: 'number',
        width: 100,
        editable: true,
    },
    {
        field: 'totalSum',
        headerName: 'Total Sum',
        type: 'number',
        width: 141,
        editable: true,
    },

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
