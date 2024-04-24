import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Mainpage from "./pages/Mainpage";
import TotalTrainerMap from "./pages/TotalTrainerMap";
import TotalCenterMap from "./pages/TotalCenterMap";
import TrainerDetail from "./pages/TrainerDetail";
import Complete from "./pages/Complete";
import TrainerProfileEdit from "./pages/TrainerProfileEdit";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import axios from "axios";
function App() {
  // fetch("http://localhost:5000/trainermap")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data[0]));
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [token, setToken] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:5000/session/checkSession");
      const result = res.data;
      setToken({ user_id: result.user_id, role: result.role });
      setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태 업데이트
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

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
            path="/trainerProfileEdit"
            element={
              <PrivateRoute
                component={<TrainerProfileEdit />}
                authenticated={token}
              />
            }
          />
          {/* <Route path="/trainerProfileEdit" element={<TrainerProfileEdit />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
