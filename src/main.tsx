import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WorldInformation from './components/WorldInformation.tsx'

/*
const NavbarWrapper = () => {
  return (
  <div>
      <Navbar/>
      <Outlet/>
  </div>
  )
};
*/

const router = createBrowserRouter([
  {
    path: "/", 
    element: <WorldInformation />,
    children: [
      {
      path: "/",
      element: (
        <h1>Home</h1>
      ),
    }
   ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={setupStore()}>
        <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
