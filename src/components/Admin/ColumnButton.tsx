import React from 'react';
import {Button} from "@material-ui/core";

interface ColumnButtonProps {
    sortHandler: Function,
    sortBy: string,
    name: string,
    select: "ASC" | "DESC"
}

const ColumnButton: React.FC<ColumnButtonProps> = ({sortHandler, sortBy, name, select}) => {
    return (
        <Button onClick={() => sortHandler(name)}>
            {name}{sortBy == name && select == "ASC" ? '▲' : '▼'}
        </Button>
    );
};

export default ColumnButton;