import React from "react";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import { useRoutes } from "react-router-dom";
import NotFound from "../pages/notfound/NotFound";
import Login from "../pages/login/Login";

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
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}
