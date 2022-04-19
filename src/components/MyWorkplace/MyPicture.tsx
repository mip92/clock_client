import React from 'react';
import {pictureData} from "./Pictures";

interface PictureProps {
    picture: pictureData
}

const MyPicture: React.FC<PictureProps> = ({picture}) => {
    return (
        <img src={picture.url}/>
    );
};

export default MyPicture;