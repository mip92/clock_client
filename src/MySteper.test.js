import {render, screen} from '@testing-library/react'
import {store} from "./store";
import {Provider} from "react-redux";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import MyStepper from "./components/Menu/MySteper";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

describe('test MyStepper', () => {
    test('render MyStepper', async () => {
        render(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Provider store={store}>
                        <MyStepper/>
                    </Provider>
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        );
        screen.debug()
        expect(await screen.getByTestId("Application")).toBeInTheDocument()
    })
})