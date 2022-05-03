import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import s from "../../../../style/OneFile.module.css"

interface OneFileProps{
    picture:File
    onDelete: Function
}

const OneFile:React.FC<OneFileProps> = ({picture, onDelete}) => {
    const [pictireSise, setPictureSize]=useState<number>()
    useEffect(()=>{
        setPictureSize((Math.round((picture.size / 1048576) * 100) / 100))
    },[picture])
    return (
        <div>
            <img width={'150px'} src={URL.createObjectURL(picture)}/>
            {picture && <div>{picture.name}</div>}
            {picture && <div className={pictireSise && picture.size>1048576 ? s.error : s.div}> {pictireSise + ' Mб'}
            </div>}
            <Button onClick={()=>onDelete(picture.name)}>Delete</Button>
        </div>
    );
};

export default OneFile;