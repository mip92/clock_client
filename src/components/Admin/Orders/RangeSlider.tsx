import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 170,
    },
});

function valuetext(value: number) {
    return `${value}°C`;
}

const RangeSlider = ({name, min, max, currentRange, setCurrentRange}) => {
    const classes = useStyles();

    const handleChange = (event: any, newValue: number | number[]) => {
        setCurrentRange(newValue as number[]);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                {name}
            </Typography>
            <Slider
                min={min}
                max={max}
                value={currentRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
export default RangeSlider