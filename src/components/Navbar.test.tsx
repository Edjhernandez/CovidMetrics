import { renderWithProviders } from "../utils/test-utils";
import { setupStore } from "../redux/store";
import { fireEvent, screen } from "@testing-library/dom";
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom';
import 'whatwg-fetch'
import { RouterProvider } from "react-router";
import { Outlet } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import WorldInformation from "./WorldInformation";
import Consult from "./Consult";
import userEvent from '@testing-library/user-event'

const NavbarWrapper = () => {
    return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
    )
}; 

const router = createBrowserRouter([
    {
      path: "/", 
      element:
      <NavbarWrapper />,    
      children: [
        {  
          path: "/", 
            element:         
            <WorldInformation/>  
        },  
        {
        path: "/consult",
        element: (
          <Consult />
        )
      }
     ] 
    }
]);

const store = setupStore();

 beforeEach(() => {
    renderWithProviders(<RouterProvider router={router} />, { store })
}) 

describe('component worldinformation', () => {
    
    test('first render', async () => {
        const input = screen.getByTestId('nav-date')
        await userEvent.clear(input)
        await userEvent.type(input, '2020-10-21')
        fireEvent.click(screen.getByRole('button', {name: 'Enter'})) 
        expect(store.getState().date.date).toBe('2020-10-21')
    }) 
         
}) 

