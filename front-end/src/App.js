import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import MainPage from "./pages/Mainpage";
import TrainerDetail from "./pages/TrainerDetail";
import TotalCenter from "./components/centermap/TotalCenter";
import TrainerMap from "./components/trainermap/TrainerMap";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/TrainerDetail", element: <TrainerDetail /> },
        { path: "/trainermap", element: <TrainerMap /> },
        { path: "/centermap", element: <TotalCenter /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
