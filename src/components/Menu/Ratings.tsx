import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";

interface RatingsProps {
    masterId: number,
    setOpen: Function
}

interface AxiosGetLastComments {
    id: number,
    rating: number,
    orderId: number,
    comment: string,
    createdAt: string,
    updatedAt: string,
    masterId: 7,
    order: {
        userId: number,
        user: {
            "name": string
        }
    }
}

const Ratings: React.FC<RatingsProps> = ({masterId, setOpen}) => {
    const [comments, setComments] = useState<AxiosGetLastComments[]>([])
    const [fetching, isFetch, error] = useFetching(async () => {
        const response = await $api.get<AxiosGetLastComments[]>(`/rating/getLastComments/${masterId}`)
        setComments(response.data)
    })
    useEffect(() => {
        fetching()
    }, [])
    if (isFetch) return <div>Loading...</div>
    return (
        <div>
            {comments.length > 0
                ? comments.map((comment) => {
                    return <div>
                        <div>User name: {comment.order.user.name}</div>
                        <div>Comment: {comment.comment}</div>
                        <div>Date: {new Date(comment.createdAt).toLocaleString()}</div>
                        <br/>
                    </div>
                })
                : <div>This master hase no comments</div>}
        </div>
    );
};

export default Ratings;
