import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Mainpage from "./pages/Mainpage";
import TotalTrainerMap from "./pages/TotalTrainerMap";
import TotalCenterMap from "./pages/TotalCenterMap";
import TrainerDetail from "./pages/TrainerDetail";
import Complete from "./pages/Complete";
import TrainerProfileEdit from "./pages/TrainerProfileEdit";

function App() {
  fetch("http://localhost:5000/trainermap")
    .then((res) => res.json())
    .then((data) => console.log(data[0]));

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
          <Route path="/trainerProfileEdit" element={<TrainerProfileEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
