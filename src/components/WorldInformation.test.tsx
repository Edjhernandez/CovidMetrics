import { renderWithProviders } from "../utils/test-utils";
import WorldInformation from "./WorldInformation";
import { setupStore } from "../redux/store";
import { screen, waitForElementToBeRemoved } from "@testing-library/dom";





const store = setupStore();

    // store.dispatch(getNamePlace(latLon));
    // store.dispatch(getForecast(latLon))
    //const { getByText } = renderWithProviders(<RouterProvider router={router} />, { store })

 jest.mock('../constants', () => ({
                ENVIRONMENT: 'development',
              })); 

    
    describe('component worldinformation', () => {
        
        test('first render', async () => {
            
            renderWithProviders(<WorldInformation />, { store })
            await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading/i))
            screen.debug()
            
    })

})