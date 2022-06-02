import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Role} from "../../enums/Roles";
import s from "../../style/NewComment.module.css";
import Typography from "@material-ui/core/Typography";
import InputWithError from "../Registration/InputWithError";
import {Button, Card, FormControlLabel} from "@material-ui/core";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import Rating from '@material-ui/lab/Rating';
import {Container} from '@material-ui/core';
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import $api from "../../http";
import {MyError} from "../../types/mainInterfacesAndTypes";

interface AxiosCreateComment {
    comment: string
    createdAt: string
    id: number
    link: string
    masterId: number
    orderId: number
    rating: number
    updatedAt: string
}

const validationSchema = Yup.object().shape({
    comment: Yup.string()
        .required('Comment is required')
        .min(6, 'Comment must be at least 6 characters'),
    rating: Yup.number()
        .required('Rating is required')
});
const formOptions = {resolver: yupResolver(validationSchema)};

const NewComment = () => {
    const history = useHistory();
    const {key} = useParams<{ key: string }>();
    const {role} = useTypedSelector(state => state.auth)
    const [isFetching, setIsFetching] = useState(false)
    const [isRatingCreated, setIsRatingCreated] = useState(false)
    const [apiError, setApiError] = useState<{message:string}>()
    const [apiValidateError, setApiValidateError]= useState<MyError[]>()
    const fetching = async (data) => {
        try {
            setIsFetching(true)
            const response = await $api.post<AxiosCreateComment>(`/rating`, {
                key,
                rating: data.rating,
                comment: data.comment,
            })
            if (response.status === 201) setIsRatingCreated(true)
        } catch (e) {
            if (JSON.parse(e.request.responseText).errors) setApiValidateError(JSON.parse(e.request.responseText).errors)
            else setApiError(JSON.parse(e.request.responseText))
        } finally {
            setIsFetching(false)
        }
    }
    const goTo = (path) => {
        history.push(path)
    }
    const {register, handleSubmit, formState: {errors}, setValue, setError} = useForm(formOptions);
    const onSubmit = data => {
        fetching(data)
    };

    useEffect(() => {
        if (role !== Role.USER) return history.push(`/login/${key}`)

    }, [role])
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        apiValidateError&& apiValidateError.map((oneError)=>{
            if (oneError?.param) {
                setError(oneError.param, {
                    type: "server error",
                    message: oneError.msg
                });
            }
        })

    }, [apiValidateError])
    if (apiError) return (
        <div className={s.wrapper}>
            <Card style={{textAlign: "center"}}>
                {apiError.message}
            </Card>
            <div className={s.btn}>
                <div className={s.btnBody}>
                    <Button variant="contained"
                            color='primary'
                            onClick={() => goTo(`/`)}>
                        Go to main page</Button>
                </div>
            </div>
        </div>
    )
    if (isRatingCreated) return (
        <div className={s.wrapper}>
            <Card style={{textAlign: "center"}}>
                Rating was created
            </Card>
            <div className={s.btn}>
                <div className={s.btnBody}>
                    <Button variant="contained"
                            color='primary'
                            onClick={() => goTo(`/`)}>
                        Go to main page</Button>
                </div>
            </div>
        </div>
    )
    if (isFetching) return <div>Loading...</div>
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className={s.wrapper}>
                <Typography variant="h6"
                            color={'secondary'}
                            className={s.typography}
                >Please comment our service</Typography>
                <div className={s.comment}>
                    <InputWithError
                        multiline={true}
                        cn={s.commentBody}
                        type="text"
                        placeholder="Comment"
                        reg={register("comment")}
                        error={errors.comment?.message}/>
                </div>
                <br/>
                <div className={s.rating}>
                    <FormControlLabel className={s.ratingBody}
                                      control={
                                          <>
                                              <Rating

                                                  name="rating"
                                                  value={rating}
                                                  precision={1}
                                                  onChange={(_, value) => {
                                                      setValue('rating', value, {shouldValidate: true})
                                                      value && setRating(value);
                                                  }}
                                                  icon={<RadioButtonUncheckedIcon fontSize="inherit"/>}
                                              />

                                          </>
                                      }
                                      label="select rating"
                    />
                </div>
                <div className={s.error}>
                    <div className={s.errorBody}>
                        {errors.rating?.message}
                    </div>
                </div>
                <div className={s.btn}>
                    <div className={s.btnBody}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default NewComment;