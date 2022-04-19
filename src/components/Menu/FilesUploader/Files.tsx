import React from 'react';
import OneFile from "./OneFile";
import s from "../../../style/Files.module.css"
import {picture} from "../../../types/mainInterfacesAndTypes";

interface FilesProps{
    imgs: picture[]
    onDelete: Function

}

const Files: React.FC<FilesProps> = ({imgs, onDelete}) => {
    return (
        <div className={s.file}>
            {imgs.map((i,key)=><OneFile key={key} img={i} onDelete={onDelete}/>)}
        </div>
    );
};

export default Files;