import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { createRoot } from "react-dom/client";
import firebaseConfig from './firebaseConfig';
import 'tw-elements';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from './pages/Login';
import Sinup from './pages/Sinup';
import Home from './pages/Home';
import From from './compnents/From';
import store from './store'
import { Provider } from 'react-redux'
import Profile from './pages/Profile';

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Link to="/"><Sinup/></Link>
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Link to="/login"><Login/></Link>
        </div>
      ),
    },
    {
      path: "/home",
      element: (
        <Home/>
      ),
    },
    {
      path: "/form",
      element: (
        <From/>
      ),
    },
    {
      path: "/profile",
      element: (
        <Profile/>
      ),
    },

  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

