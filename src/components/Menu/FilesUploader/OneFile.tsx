import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import s from "../../../style/OneFile.module.css"
import {picture} from "./FileUploaderContainer";

interface OneFileProps{
    img:picture
    onDelete: Function
}

const OneFile:React.FC<OneFileProps> = ({img, onDelete}) => {
    const [pictireSise, setPictureSize]=useState<number>()
    useEffect(()=>{
        setPictureSize((Math.round((img.size / 1048576) * 100) / 100))
    },[img])
    return (
        <div>
            <img width={'219.4px'} src={URL.createObjectURL(img)}/>
            {img && <div>{img.name}</div>}
            {img && <div className={pictireSise && img.size>1048576 ? s.error : s.div}> {pictireSise + ' Mб'}
            </div>}
            <Button onClick={()=>onDelete(img.name)}>Delete</Button>
        </div>
    );
};

export default OneFile;