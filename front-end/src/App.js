import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Mainpage from "./pages/Mainpage";
import TotalTrainerMap from "./pages/TotalTrainerMap";
import TotalCenterMap from "./pages/TotalCenterMap";
import TrainerDetail from "./pages/TrainerDetail";
import Userinfo from "./components/mypage/userinfo/Userinfo";
import Coachinfo from "./components/mypage/trainerinfo/Coachinfo";
import LessonPage from "./components/mypage/trainercalendar/LessonCalendar";
import TrainerDetailEdit from "./components/mypage/trainerdetailinfoedit/EditForm";
import Complete from "./pages/Complete";
import TrainerProfileEdit from "./pages/TrainerProfileEdit";
import PrivateRoute from "components/privateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Mainpage />} />
          <Route path="/trainermap" element={<TotalTrainerMap />} />
          <Route path="/centermap" element={<TotalCenterMap />} />
          <Route path="/trainerDetail" element={<TrainerDetail />} />
          <Route path="/login/roleError/:role" element={<Mainpage />} />
          <Route path="/complete" element={<Complete />} />
          <Route
            path="/mypage/userinfo"
            element={
              <PrivateRoute
                component={<Userinfo />}
                token={data}
                role={"user"}
              />
            }
          />
          <Route
            path="/mypage/coachinfo"
            element={
              <PrivateRoute
                component={<Coachinfo />}
                token={data}
                role={"trainer"}
              />
            }
          />
          <Route
            path="/trainerProfileEdit"
            element={
              <PrivateRoute
                component={<TrainerProfileEdit />}
                token={data}
                role={"trainer"}
              />
            }
          />
          <Route
            path="/mypage/trainerProfile/Edit"
            element={
              <PrivateRoute
                component={<TrainerDetailEdit />}
                token={data}
                role={"trainer"}
              />
            }
          />
          <Route
            path="/lessonpage"
            element={
              <PrivateRoute
                component={<LessonPage />}
                token={data}
                role={"trainer"}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
