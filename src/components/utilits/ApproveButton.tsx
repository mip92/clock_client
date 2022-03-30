import React from 'react';
import {Button, makeStyles} from "@material-ui/core";

interface ApproveButtonProps {
    isApproved: boolean,
    approveMaster: () => void
}

const ApproveButton: React.FC<ApproveButtonProps> = ({isApproved, approveMaster}) => {
    const useStyles = makeStyles({
        approved: {
            backgroundColor: 'lightgreen'
        },
        notApproved: {
            backgroundColor: 'lightpink'
        },
    });
    const classes = useStyles();
    return (
        <Button className={isApproved ? classes.approved : classes.notApproved}
                onClick={approveMaster}>
            {isApproved ? "Подтвержден" : "Подтвердить"}
        </Button>

    );
};

export default ApproveButton;