import React from "react";
import Header from "../../components/Header/Header";
import ServerMetrics from "../../components/Dashboard/ServerMetric";

function ServerStatusPage() {
  return (
    <div>
      <Header/>
      <ServerMetrics/>
    </div>
  );
}

export default ServerStatusPage;
