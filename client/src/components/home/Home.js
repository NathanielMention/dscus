import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div>This is home page!</div>
    </>
  );
};

export default Home;
