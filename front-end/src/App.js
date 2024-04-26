import React from "react";
import Root from "./pages/Root";
import Mainpage from "./pages/Mainpage";
import TotalTrainerMap from "./pages/TotalTrainerMap";
import TotalCenterMap from "./pages/TotalCenterMap";
import TrainerDetail from "./pages/TrainerDetail";
import Userinfo from "./components/mypage/Userinfo/Userinfo";
import Coachinfo from "./components/mypage/Coachinfo/Coachinfo";
import Complete from "./pages/Complete";
import TrainerProfileEdit from "./pages/TrainerProfileEdit";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  // fetch("http://localhost:5000/trainermap")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data[0]));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <Mainpage /> },
        { path: "/trainermap", element: <TotalTrainerMap /> },
        { path: "/centermap", element: <TotalCenterMap /> },
        { path: "/trainerDetail", element: <TrainerDetail /> },
        { path: "/mypage/userinfo", element: <Userinfo /> },
        { path: "/mypage/coachinfo", element: <Coachinfo /> },
        { path: "/login/roleError/:role", element: <Mainpage />},
        { path: "/complete", element: <Complete />},
        { path: "/trainerProfileEdit", element: <TrainerProfileEdit />},
      ],
    },
  ]);
  return <RouterProvider router={router}/>
}

export default App;
