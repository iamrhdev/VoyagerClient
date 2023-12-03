import React from "react";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import { useRoutes } from "react-router-dom";
import NotFound from "../pages/notfound/NotFound";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";

export default function Routes() {
  let routes = [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}
