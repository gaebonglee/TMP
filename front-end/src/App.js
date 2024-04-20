import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Mainpage from "./pages/Mainpage";
import TotalTrainerMap from "./pages/TotalTrainerMap";
import TotalCenterMap from "./pages/TotalCenterMap";
import TrainerDetail from "./pages/TrainerDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <Mainpage /> },
        { path: "/trainermap", element: <TotalTrainerMap /> },
        { path: "/centermap", element: <TotalCenterMap /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
