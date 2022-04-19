import React from 'react';
import FileUploaderContainer from "./FilesUploader/FileUploaderContainer";
import {Button, Card} from "@material-ui/core";
import s from "../../style/SecondStep.module.css";

const ThirdStep = ({tempFile, addTempFile, setError, back, next}) => {
    return (
        <div>
            {/*<Card className={s.wrapper}>
                <FileUploaderContainer tempFile={tempFile}
                                       addTempFile={addTempFile}
                                       setError={setError}
                />

            </Card>
            <div className={s.buttons}>
                <Button variant="contained"
                        color='primary'
                        onClick={() => back()}>
                    Назад</Button>
                <div style={{color: 'red'}}></div>
                <Button variant="contained"
                        color='primary'
                        onClick={() => next()}>
                    Далее</Button>
            </div>*/}
        </div>
    );
};

export default ThirdStep;