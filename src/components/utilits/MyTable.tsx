import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
/*import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';*/

const getString=(date)=>{
    const d=new Date(date)
    return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()} ${d.getHours()}:00`
}
const MyTable = ({rows}) => {
    return (
        <TableContainer component={Paper}>
            <Table /*sx={{ minWidth: 650 }} size="small" aria-label="a dense table"*/>
                <TableHead>
                    <TableRow>
                        <TableCell>Id заказа</TableCell>
                        <TableCell align="right">Время заказа</TableCell>
                        <TableCell align="right">Размер часов</TableCell>
                        <TableCell align="right">ID заказчика</TableCell>
                        <TableCell align="right">Почта заказчика</TableCell>
                        <TableCell align="right">Имя заказчика</TableCell>
                        <TableCell>ID мастера</TableCell>
                        <TableCell align="right">Почта мастера</TableCell>
                        <TableCell align="right">Имя мастера</TableCell>
                        <TableCell align="right">ID города</TableCell>
                        <TableCell align="right">Название города</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, key) => (
                        <TableRow
                            key={key}
                            /*sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/
                        >
                            <TableCell align="right">{row.orderId}</TableCell>
                            <TableCell align="right">{getString(row.dateTime)}</TableCell>
                            <TableCell align="right">{row.clockSize}</TableCell>
                            <TableCell align="right">{row.userId}</TableCell>
                            <TableCell align="right">{row.userEmail}</TableCell>
                            <TableCell align="right">{row.userName}</TableCell>
                            <TableCell align="right">{row.masterId}</TableCell>
                            <TableCell align="right">{row.masterEmail}</TableCell>
                            <TableCell align="right">{row.masterName}</TableCell>
                            <TableCell align="right">{row.cityId}</TableCell>
                            <TableCell align="right">{row.cityName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default MyTable