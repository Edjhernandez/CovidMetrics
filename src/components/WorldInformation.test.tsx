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
    
    test('first render', async () => {
        expect(screen.getAllByText(/Loading.../i)).toHaveLength(3);
    })
        
    test('first render', async () => {
        await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading/i))
        expect(screen.getAllByText(/Deaths/i)).toHaveLength(12);
    })
    
     test('asynchronous rejection', async () => {
        server.use(...errorHandlers)
        await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading/i))
        expect(screen.getAllByText(/Ooopss! error: 423, sorry.../i)).toHaveLength(3);
    })

})