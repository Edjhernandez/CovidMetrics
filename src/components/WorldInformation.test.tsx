import { renderWithProviders } from "../utils/test-utils";
import WorldInformation from "./WorldInformation";
import { setupStore } from "../redux/store";
import { screen, waitForElementToBeRemoved } from "@testing-library/dom";
import '@testing-library/jest-dom';
import 'whatwg-fetch'

const store = setupStore();
beforeEach(() => {
    renderWithProviders(<WorldInformation />, { store })
})
 
describe('component worldinformation', () => {

    test('first render', async () => {
        expect(screen.getAllByText(/Loading.../i)).toHaveLength(3);
    })
        
    test('first render', async () => {
            await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading/i))
            //screen.debug()
            expect(screen.getAllByText(/Deaths/i)).toHaveLength(12);
    })

})