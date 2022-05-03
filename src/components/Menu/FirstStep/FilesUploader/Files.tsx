import React from 'react';
import OneFile from "./OneFile";
import s from "../../../../style/Files.module.css"

interface FilesProps{
    pictures: File[]
    onDelete: Function
}

const Files: React.FC<FilesProps> = ({pictures, onDelete}) => {
    return (
        <div className={s.file}>
            {pictures.map((picture,key)=><OneFile key={key} picture={picture} onDelete={onDelete}/>)}
        </div>
    );
};

export default Files;