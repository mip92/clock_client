import React, {useState} from 'react';
import {OrderInterface} from "../Admin/Order";
import {Paper, Table, TableContainer, Typography} from "@material-ui/core";
import {log} from "util";
//import './styles.css';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                // @ts-ignore
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    // @ts-ignore
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                // @ts-ignore
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    // @ts-ignore
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {

        let direction = 'ascending';

        if (
            // @ts-ignore
            sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        console.log(key, direction)
        // @ts-ignore

        setSortConfig({key, direction});
    };

    return {items: sortedItems, requestSort, sortConfig};
};

const ProductTable = ({products}) => {
    const {items, requestSort, sortConfig} = useSortableData(products);
    /*const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };*/
    const btnConfig=['dateTime','clockSize','userId','userEmail','userName',
        'cityId','masterEmail','masterName','masterId','cityName']

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5">My orders</Typography>
            <Table  size="small" aria-label="a dense table">

            <thead>
            <tr>
                {btnConfig.map((btn,key)=>
                    <th key={key}>
                        <button
                            type="button"
                            onClick={() => requestSort(btn)}
                            //className={getClassNamesFor('name')}
                        >
                            {btn}
                        </button>
                    </th>)}
            </tr>
            </thead>
            <tbody>

            {items.map((item) => (
                <tr key={item.orderId}>
                    <td>{item.dateTime}</td>
                    <td>{item.clockSize}</td>
                    <td>{item.userId}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.userName}</td>
                    <td>{item.masterId}</td>
                    <td>{item.masterEmail}</td>
                    <td>{item.masterName}</td>
                    <td>{item.cityId}</td>
                    <td>{item.cityName}</td>
                </tr>
            ))}
            </tbody>
            </Table>
        </TableContainer>
    );
};

interface OrdersProps {
    orders: OrderInterface[] | null
}

const WorkplaceTable: React.FC<OrdersProps> = ({orders}) => {
    return (
        <div>
            {orders && <ProductTable products={orders}/>}
        </div>
    );
}
export default WorkplaceTable