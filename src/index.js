import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// ////////////////////////////////////////////////////////////////////
//react router import
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
// import AddPost from "./pages/AddPost";
// import EditPost from "./pages/EditPost";
// import Details from "./pages/Details";
// import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import {Provider} from "react-redux";
import store from "./state";
const AddPost = React.lazy(() => import('./pages/AddPost'));
const Details = React.lazy(() => import('./pages/Details'));
const EditPost = React.lazy(() => import('./pages/EditPost'));
const Index = React.lazy(() => import('./pages/Index'));
// createBrowserRouter to create the routes
// RouterProvider to follow the routes and provide files
// ////////////////////////////////////////////////////////////////////

// import App from "./App";

// const postParamHandler =(params)=>{
//           if (isNaN(params.id)) {
//             throw new Response("BadRequest", {
//               statusText: "please make sure insert correct post Id",
//               status: 400,
//             });
//           }
// };

const postParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("BadRequest", {
      statusText: "please make sure to insert correct post ID",
      status: 400,
    });
  }
  return null;
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element:
        <Suspense fallback="loading ..."><Index /></Suspense>
         },
      { path: "post", element: <Suspense fallback="loading ..."><Index /></Suspense> },
      { path: "post/add", element: <Suspense fallback="loading ..."><AddPost /></Suspense> },
      // {
      //   path: "post/:id",
      //   element: <Details />,
      //   loader: ({ params }) => {
      //     if (isNaN(params.id)) {
      //       throw new Response("BadRequest", {
      //         statusText: "please make sure insert correct post Id",
      //         status: 400,
      //       });
      //     }
      //   },
      // },
      {
        path: "post/:id",
        element: <Suspense fallback="loading ..."><Details /></Suspense> ,
        loader:postParamHandler,
      },
      { path: "post/:id/edit", element: <Suspense fallback="loading ..."><EditPost /></Suspense> , loader:postParamHandler, },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
