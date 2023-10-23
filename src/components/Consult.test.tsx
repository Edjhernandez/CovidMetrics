import { renderWithProviders } from "../utils/test-utils";
import Consult from "./Consult";
import { setupStore } from "../redux/store";
import { screen } from "@testing-library/dom";
import '@testing-library/jest-dom';
import 'whatwg-fetch'
import userEvent from '@testing-library/user-event'
import {server} from '../mocks/server'
import { errorHandlers } from "../mocks/errorHandlers";
//import { prettyDOM } from "@testing-library/dom"; 
    
describe('component consult', () => {
  test("Render Consult", async ()=> {
    const store = setupStore();
    renderWithProviders(<Consult />, { store })
    const input =screen.getByTestId('date');
    await userEvent.clear(input)
    await userEvent.type(input, '2020-10-21')
    await userEvent.selectOptions(
    // Find the select element
    screen.getByRole('combobox'),
    // Find and select the Ireland option
    screen.getByRole('option', {name: /United Kingdom/i}),)
    // const opt = screen.getByRole('option', {name: /Venezuela/i})
    // console.log(prettyDOM(opt))
    const button = screen.getByRole('button')
    await userEvent.click(button);
    const selecs = screen.getAllByRole('combobox')
    await userEvent.selectOptions(
       // Find the select element
       selecs[1],
       // Find and select the Ireland option
       screen.getByRole('option', {name: /England/i}),)
    // console.log(prettyDOM(button))
    //expect((screen.getByRole('option', {name: /United Kingdom/i}) as HTMLOptionElement).selected).toBeTruthy()
    // expect(input).toHaveValue('2020-06-10');
    // const loading = screen.getByText(/Loading/i)
    //screen.debug()
    //expect(button).toBeInTheDocument();
        
    // await userEvent.type(input, '2022-09-09')
    //  expect(screen.getByRole('combobox', {name: /Choice a province/i})).toBeInTheDocument();
       
    // expect(screen.getByText(/2636/i)).toBeInTheDocument();
    //expect((screen.getByRole('option', {name: /England/i}) as HTMLOptionElement).selected).toBeTruthy()
    // console.log(prettyDOM(screen.getByText(/669973/i)))
    expect(screen.getByText(/669973/i)).toBeInTheDocument();
  }, 10000)

  test("Render Consult Country without provinces", async ()=> {
    const store = setupStore();
    renderWithProviders(<Consult />, { store })
    const input =screen.getByTestId('date');
    await userEvent.clear(input)
    await userEvent.type(input, '2020-10-21')
    await userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', {name: /Venezuela/i}),)
    const button = screen.getByRole('button')
    await userEvent.click(button);
    expect(screen.getByText(/81626/i)).toBeInTheDocument();
  }, 10000)

 test("Must Handler error fetch", async ()=> {
    // as default success response is served from handler.js but for error case we have to mock errorHandlers.js file
    //server.use method provide mechanism to switch response
    server.use(...errorHandlers)
    const store = setupStore();
    renderWithProviders(<Consult />, { store })
    const input =screen.getByTestId('date');
    await userEvent.clear(input)
    await userEvent.type(input, '2020-10-21')
    await userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', {name: /Venezuela/i}),)
    const button = screen.getByRole('button')
    await userEvent.click(button); 
      expect(screen.getByText(/An error has ocurred/i)).toBeInTheDocument();
 })
})

