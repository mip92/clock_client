import {render, screen} from '@testing-library/react'
import {store} from "./store";
import {Provider} from "react-redux";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import MyStepper from "./components/Menu/MySteper";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import InputWithError from "./components/Registration/InputWithError";


describe('test MyStepper', () => {
    test('render MyStepper', async () => {
        render(
            <InputWithError placeholder='ss' error={} reg={} cn={} type={}/>
        );
        screen.debug()
        //const btnNext = await screen.getByTestId("myBtnNext")
        //expect(btnNext).toBeInTheDocument()
    })
})