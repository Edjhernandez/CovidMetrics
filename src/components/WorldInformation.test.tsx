import { renderWithProviders } from "../utils/test-utils";
import WorldInformation from "./WorldInformation";
import { setupStore } from "../redux/store";
import { screen, waitForElementToBeRemoved } from "@testing-library/dom";
import '@testing-library/jest-dom';
import 'whatwg-fetch'



const store = setupStore();

    

 
    
    describe('component worldinformation', () => {
        
        test('first render', async () => {
            
            renderWithProviders(<WorldInformation />, { store })
            await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading/i))
            //screen.debug()
            expect(screen.getByText(/Several countries Information/i)).toBeInTheDocument()
    })

})