import React from "react";
import TrainerMap from "./components/mainpage/trainermap/TrainerMap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import MainPage from "./components/mainpage/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/trainermap", element: <TrainerMap /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
