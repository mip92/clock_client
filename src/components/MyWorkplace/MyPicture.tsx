import React from 'react';
import {pictureData} from "./Pictures";
import s from '../../style/MyPicture.module.css'

interface PictureProps {
    picture: pictureData
}

const MyPicture: React.FC<PictureProps> = ({picture}) => {
    const openImageWindow = (src) => {
        const image = new Image();
        image.src = src;
        const width = image.width;
        const height = image.height;
        window.open(src,"Image","width=" + width + ",height=" + height);
    }
    return (
        <img onClick={()=>openImageWindow(picture.url)} className={s.img} width={400} src={picture.url}/>
    )
};

export default MyPicture;