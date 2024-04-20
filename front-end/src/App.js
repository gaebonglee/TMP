import React from "react";
import TrainerMap from "./components/trainermap/TrainerMap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import MainPage from "./components/mainpage/MainPage";
import TotalCenter from "./components/centermap/TotalCenter";
import TrainerDetail from "./pages/TrainerDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/trainermap", element: <TrainerMap /> },
        { path: "/centermap", element: <TotalCenter /> },
        { path: "/trainerdetail", element: <TrainerDetail /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
