import React, {FC} from 'react';
import {Step, StepLabel, Stepper} from "@material-ui/core";


interface IStepWrapperProps {
    activeStep: number
    steps: Array<string>
}

const StepWrapper: FC<IStepWrapperProps> = ({steps, activeStep, children}) => {
    return (
        <div>
            <Stepper activeStep={activeStep} style={{padding: '5px'}}>
                {steps.map((s, index) =>
                    <Step key={s} completed={activeStep > index}>
                        <StepLabel>{s}</StepLabel>
                    </Step>
                )}
            </Stepper>
                <div style={{width: '100%', height: '100%'}}>
                    {children}
                </div>
        </div>
    );
};

export default StepWrapper;