import React from "react";
import {ServerList} from "../../components/ServerListComp/ServerList";
import Header from "../../components/Header/Header";

function ServerListPage() {
  return (
    <div>
      <Header />
      <ServerList />
    </div>
  );
}

export default ServerListPage;
