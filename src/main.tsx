import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { Provider } from 'react-redux'
// import { setupStore } from './redux/store.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
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
    element: <NavbarWrapper/>,
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
     {/* <Provider store={setupStore()}> */}
        {/* <App /> */}
        <RouterProvider router={  router} />
     {/* </Provider> */}
  </React.StrictMode>,
)
