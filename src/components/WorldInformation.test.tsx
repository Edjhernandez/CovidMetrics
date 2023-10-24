import { renderWithProviders } from "../utils/test-utils";
import WorldInformation from "./WorldInformation";
import { setupStore } from "../redux/store";
import { screen, waitForElementToBeRemoved } from "@testing-library/dom";
import '@testing-library/jest-dom';
import 'whatwg-fetch'
import { errorHandlers } from "../mocks/errorHandlers";
import { server } from "../mocks/server";

const store = setupStore();
beforeEach(() => {
    renderWithProviders(<WorldInformation />, { store })
})

describe('component worldinformation', () => {
    
    test('first render with loading icons', async () => {
        expect(screen.getAllByAltText(/loading-icon/i)).toHaveLength(3);
    })
        
    test('should render the three components', async () => {
        await waitForElementToBeRemoved(() => screen.queryAllByAltText(/loading-icon/i))
        expect(screen.getAllByText(/Deaths/i)).toHaveLength(12);
    })
    
     test('asynchronous rejection for api response error', async () => {
        server.use(...errorHandlers)
        await waitForElementToBeRemoved(() => screen.queryAllByAltText(/loading-icon/i))
        expect(screen.getAllByText(/Ooopss! error: 423, sorry.../i)).toHaveLength(3);
    })

})