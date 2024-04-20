import React from "react";
import TrainerMap from "./components/trainermap/TrainerMap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import MainPage from "./components/mainpage/MainPage";
import TotalCenter from "./components/centermap/TotalCenter";

function App() {
  fetch("http://localhost:5000/trainermap")
    .then((res) => res.json())
    .then((data) => console.log(data[0]));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/trainermap", element: <TrainerMap /> },
        { path: "/centermap", element: <TotalCenter /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
