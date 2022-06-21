import {fireEvent, render, screen} from '@testing-library/react'
import React from "react";
import Login from "./components/Registration/Login";
import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {Provider} from "react-redux";
import {store} from "./store";

describe('test Login', () => {

    it('with valid inputs', async () => {
        const mockOnSubmit = jest.fn()
        const {getByPlaceholderText, getByRole, } = render(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Provider store={store}>
                    <Login onSubmit={mockOnSubmit}/>
                    </Provider>
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        )

        await act(async () => {
            fireEvent.change(getByPlaceholderText('Email', {target: {value: 'ssssss@ssssss.ss'}}))
            fireEvent.change(getByPlaceholderText('Password', {target: {value: 'ssssss@ssssss.ss'}}))
        })
        /*await  act(async ()=>{
            fireEvent.click(getByRole("button"))
        })*/
        screen.debug()
        //expect(mockOnSubmit).toHaveBeenCalled()
    })
})