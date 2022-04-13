import React from 'react';
import OneFile from "./OneFile";
import {picture} from "./FileUploaderContainer";

interface FilesProps{
    imgs: picture[]
    onDelete: Function

}

const Files: React.FC<FilesProps> = ({imgs, onDelete}) => {
    return (
        <div>
            {imgs.map((i,key)=><OneFile key={key} img={i} onDelete={onDelete}/>)}
        </div>
    );
};

export default Files;