import React from 'react';
import s from '../../style/MyPicture.module.css'
import {Picture} from "../../store/reducers/workplaceReducer";

interface PictureProps {
    picture: Picture
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
        <img onClick={()=>openImageWindow(picture.url)}
             className={s.img}
             width={400}
             src={`${process.env.REACT_APP_CLOUDINARY}/${picture.path}`}/>
    )
};

export default MyPicture;