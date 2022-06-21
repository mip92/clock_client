import {render, screen} from '@testing-library/react'
import {store} from "./store";
import {Provider} from "react-redux";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import FirstStep from "./components/Menu/FirstStep";
import axios from "axios";

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            }
        }))
    }
})


describe('test MyStepper', () => {
    let response;
    beforeEach(()=>{
        response={
            data:[
                {
                    id:1,
                    name:'dnepr'
                }
            ]
        }
    })
    test('render MyStepper', async () => {
        //axios.get.mockReturnValue(response)
        render(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Provider store={store}>
                            <FirstStep/>
                        </Provider>
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        );
        screen.debug()
        const btnNext = await screen.getByTestId("myBtnNext")
        expect(btnNext).toBeInTheDocument()
    })
})