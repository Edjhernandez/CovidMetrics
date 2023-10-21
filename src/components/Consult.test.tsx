import { renderWithProviders } from "../utils/test-utils";
import Consult from "./Consult";
import { setupStore } from "../redux/store";
import { screen } from "@testing-library/dom";
import '@testing-library/jest-dom';
import 'whatwg-fetch'
import userEvent from '@testing-library/user-event'




 
    
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
             // console.log(prettyDOM(button))
             //expect((screen.getByRole('option', {name: /United Kingdom/i}) as HTMLOptionElement).selected).toBeTruthy()
             // expect(input).toHaveValue('2020-06-10');
             // const loading = screen.getByText(/Loading/i)
              //screen.debug()
              //expect(button).toBeInTheDocument();
        
           // await userEvent.type(input, '2022-09-09')
           // expect(getByRole('combobox')).toBeInTheDocument();
           expect(screen.getByText(/2636/i)).toBeInTheDocument();
          })

})