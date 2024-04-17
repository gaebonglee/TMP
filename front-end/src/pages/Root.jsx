import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useLocation} from "react-router-dom";


const noFooterPath = ["/trainermap","/centermap"]
const Root = () => {
  const {pathname} = useLocation()
  const checkPath = noFooterPath.some((path) => path === pathname)
  
  return (
    <div style={{minHeight : "100vh", display : "flex", flexDirection : "column"}}>
      <Header />
      <div style={{flexGrow : "1"}}>
        <Outlet />
      </div>
      {checkPath? null : <Footer /> }
    </div>
  );
};

export default Root;
