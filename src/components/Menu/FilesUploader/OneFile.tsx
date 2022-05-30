import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import s from "../../../style/OneFile.module.css"

interface OneFileProps {
    img: File
    onDelete: Function,
    index: number
}

const OneFile: React.FC<OneFileProps> = ({img, index, onDelete}) => {
    const [pictireSise, setPictureSize] = useState<number>()
    useEffect(() => {
        setPictureSize((Math.round((img.size / 1048576) * 100) / 100))
    }, [img])
    return (
        <div className={(index > 4 || img.size > 1048576) ? s.item : s.photo}>
            <img alt="order_picture" className={index > 4 ? s.itemPhoto : s.photo} width={'150px'}
                 src={URL.createObjectURL(img)}/>
            {img && <div>{img.name}</div>}
            {img && <div className={pictireSise && img.size > 1048576 ? s.error : s.div}> {pictireSise + ' Mб'}
            </div>}
            <Button onClick={() => onDelete(img.name)}>Delete</Button>
        </div>
    );
};

export default OneFile;