import { renderWithProviders } from "../utils/test-utils";
import Consult from "./Consult";
import { setupStore } from "../redux/store";
import { screen } from "@testing-library/dom";
import '@testing-library/jest-dom';
import 'whatwg-fetch'
import userEvent from '@testing-library/user-event'
import {server} from '../mocks/server'
import { errorHandlers } from "../mocks/errorHandlers"; 
    
describe('component consult', () => {
  test("Render Consult", async ()=> {
    const store = setupStore();
    renderWithProviders(<Consult />, { store })
    const input =screen.getByTestId('date');
    await userEvent.clear(input)
    await userEvent.type(input, '2020-10-21')
    await userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', {name: /United Kingdom/i}),)
    const button = screen.getByRole('button')
    await userEvent.click(button);
    const selecs = screen.getAllByRole('combobox')
    await userEvent.selectOptions(
       selecs[1],
       screen.getByRole('option', {name: /England/i}),)
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

