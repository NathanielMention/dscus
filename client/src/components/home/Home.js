import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Wrapper from "../common/Wrapper";
import ChatContainer from "../chatContainer/ChatContainer";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <ChatContainer></ChatContainer>
      </Wrapper>
    </>
  );
};

export default Home;
