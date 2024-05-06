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
import ReservationPage from "./components/trainerdetail/detailRight/reservation/ReservationPage";
import TrainerDetailEdit from "./components/mypage/trainerdetailinfoedit/EditForm";
import Complete from "./pages/Complete";
import TrainerProfileEdit from "./pages/TrainerProfileEdit";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/trainermap/LoadingSpinner";
import InquiryMain from "./components/inquiry/InquiryMain";
import Inquiry from "./components/inquiry/Inquiry"
import InquiryList from "./components/inquiry/InquiryList"
import InquiryPassword from "components/inquiry/InquiryPassword";
import Confirmation from "components/trainerdetail/detailRight/reservation/contents/Confirmation";
import PaymentComplete from "components/payment/PaymentComplete";
import Faq from "components/faq/Faq";
import FaqCoach from "components/faq/FaqCoach";

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["loginInfo"],
    queryFn: () =>
      fetch("http://localhost:5000/session/checkSession", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Mainpage />} />
          <Route path="/trainermap" element={<TotalTrainerMap />} />
          <Route path="/centermap" element={<TotalCenterMap />} />
          <Route path="/trainerDetail/:trainerId" element={<TrainerDetail />} />
          <Route path="/login/roleError/:role" element={<Mainpage />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/servicecenter" element={<InquiryMain />}>
            <Route path="/servicecenter/inquiry" element={<Inquiry />} />
            <Route path="/servicecenter/inquirypassword" element={<InquiryPassword />} />
            <Route path="/servicecenter/inquirylist" element={<InquiryList />} />
          </Route>
          <Route path="/faq" element={<Faq />} />
          <Route path="/faqCoach" element={<FaqCoach />} />
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
                component={<TrainerProfileEdit userId={data.user_id} />}
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
            path="/mypage/lessonpage"
            element={
              <PrivateRoute
                component={<LessonPage />}
                token={data}
                role={"trainer"}
              />
            }
          />
          <Route
            path="/reservationPage/:trainerId"
            element={
              <PrivateRoute
                component={<ReservationPage />}
                token={data}
                role={"user"}
              />
            }
          />
          <Route
            path="/confirmation/:trainerId"
            element={
              <PrivateRoute
                component={<Confirmation />}
                token={data}
                role={"user"}
              />
            }
          />
          <Route
            path="/paymentComplete/:reservationId"
            element={
              <PrivateRoute
                component={<PaymentComplete />}
                token={data}
                role={"user"}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
