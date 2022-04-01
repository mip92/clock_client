import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const MyOffice = () => {
    let {userId} = useParams<{userId :string}>();
    useEffect(() => {

    })
    return (
        <div>
            {userId}
        </div>
    );
};

export default MyOffice;