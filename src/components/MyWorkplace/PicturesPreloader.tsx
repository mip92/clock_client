import React from 'react';
import s from '../../style/PicturesPreloader.module.css'
const PicturesPreloader = ({pictures}) => {
    if (pictures.length===0) return <div>Picture is not found</div>
    return (
        <div>
            {pictures.map((p,key)=><img className={s.img}  key={key} src={`${process.env.REACT_APP_CLOUDINARY}/${p.picture.path}`}/>)}
        </div>
    );
};

export default PicturesPreloader;