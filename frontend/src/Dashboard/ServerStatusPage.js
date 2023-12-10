import React from "react";
import Header from "../Header/Header";
import ServerStatus from "./serverstatus";

function ServerStatusPage() {
  return (
    <div>
      <Header/>
      <ServerStatus />
    </div>
  );
}

export default ServerStatusPage;
