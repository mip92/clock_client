import React from 'react';
import s from '../../style/PicturesPreloader.module.css'

const PicturesPreloader = ({pictures}) => {
    if (pictures.length === 0) return <div>Pictures was not uploaded</div>
    return (
        <div>
            {pictures.map((p) => <img alt="order_picture" className={s.img} key={p.id}
                                      src={`${process.env.REACT_APP_CLOUDINARY}/${p.picture.path}`}/>)}
        </div>
    );
};

export default PicturesPreloader;