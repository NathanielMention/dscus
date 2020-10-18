import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Wrapper from "../common/Wrapper";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
      </Wrapper>
    </>
  );
};

export default Home;
