import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider, createBrowserRouter
} from "react-router-dom";
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import MyState from './components/context/context';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "404 Not Found!",
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: "404 Not Found!"
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: "404 Not Found!"
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyState>
      <RouterProvider router={router} /> 
    </MyState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
