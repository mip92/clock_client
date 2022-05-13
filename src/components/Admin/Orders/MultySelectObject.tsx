import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 160,
            maxWidth: 180,
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


function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface MultipleSelectObjectProps {
    name :string,
    setCorrectName,
    correctName,
    arr
}

const MultipleSelectObject:React.FC<MultipleSelectObjectProps> = ({name, setCorrectName, correctName, arr}) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCorrectName(event.target.value as string[]);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">{name}</InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={correctName}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {arr.map((size) => (
                        <MenuItem key={size} value={size} style={getStyles(size.name, correctName, theme)}>
                            {size.name}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>

        </div>
    );
}
export default MultipleSelectObject