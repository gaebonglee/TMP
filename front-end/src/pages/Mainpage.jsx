import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Search from "../components/mainpage/Search";
import TrainerCard from "../components/mainpage/TrainerCard";

const Home = () => {
  return (
    <div>
      <Header />
      <Search />
      <TrainerCard />
      <Footer />
    </div>
  );
};

export default Home;
