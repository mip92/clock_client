import React from 'react';
import OneFile from "./OneFile";
import s from "../../../style/Files.module.css"

interface FilesProps {
    imgs: File[]
    onDelete: Function
}

const Files: React.FC<FilesProps> = ({imgs, onDelete}) => {
    return (
        <div>
            <div className={s.file}>
                {imgs.map((i, index,) => {
                    return <OneFile key={index} index={index} img={i} onDelete={onDelete}/>
                })}
            </div>
            {imgs.length > 5 && <div style={{color: 'red'}}>Максимум 5 картинок</div>}
        </div>
    );
};

export default Files;