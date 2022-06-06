import React, {FC, useEffect} from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    makeStyles,
    createStyles,
    Theme,
    Input, Chip, MenuItem
} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {Master} from "../../../types/adminMasterTypes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 160,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


interface MastersMultySelectProps {
    masters: Master[],
    setArrayCurrentMasters: any
}

const MastersMultySelect: FC<MastersMultySelectProps> = ({masters, setArrayCurrentMasters}) => {
    const {error} = useTypedSelector(state => state.auth)
    const classes = useStyles();
    const {control, handleSubmit, watch, setError} = useForm();
    const onSubmit = handleSubmit(async data => {
            let result: number[] = []
            masters.forEach((master) => {
                if (data.mastersId.includes(master.email)) {
                    result = [...result, master.id]
                }
            })
            setArrayCurrentMasters(result)
        }
    );
    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])
    return (
        <div onBlur={onSubmit}>
            <Controller
                name="mastersId"
                control={control}
                defaultValue={[]}
                render={({field}) => (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-multiple-chip-label">Master</InputLabel>
                        <Select
                            {...field}
                            labelId="LabelMasters"
                            label="masters"
                            multiple
                            error={watch("mastersId")?.length === 0 && error?.value?.length === 0}
                            input={<Input id="select-multiple-chip"/>}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} className={classes.chip}/>
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {masters.map((master, key) => (
                                <MenuItem key={key} value={master.email}>
                                    {master.email}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            {watch("mastersId")?.length === 0 && error?.value?.length === 0 &&
            <div style={{color: "red"}}>{error?.msg}</div>}
        </div>
    );
};

export default MastersMultySelect;