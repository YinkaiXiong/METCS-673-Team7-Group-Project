import "./css/serverstatus.css";
import ReactECharts from "echarts-for-react";
import { useCallback, useState } from "react";

function ServerStatus() {
  const servers = [
    {
      name: "Northeast-Server-1",
      ipAddress: "192.168.1.1",
      status: {
        cpuUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [134, 211, 434, 221, 33, 444, 245],
        },
        ramUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [314, 332, 532, 223, 556, 22, 35],
        },
        views: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [345, 33, 566, 222, 53, 34, 234],
        },
        diskUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [44, 324, 568, 890, 87, 567, 98],
        },
        visitorsDistribution: 844,
      },
    },
    {
      name: "Northeast-Server-2",
      ipAddress: "10.163.1.5",
      status: {
        cpuUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [43, 23, 565, 34, 56, 54, 333],
        },
        ramUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [222, 667, 87, 566, 588, 564, 453],
        },
        views: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [33, 543, 654, 446, 334, 678, 344],
        },
        diskUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [446, 443, 234, 53, 545, 33, 56],
        },
        visitorsDistribution: 188,
      },
    },
    {
      name: "West-Server-1",
      ipAddress: "192.168.1.6",
      status: {
        cpuUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [345, 555, 443, 54, 345, 34, 55],
        },
        ramUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [55, 33, 224, 23, 554, 66, 44],
        },
        views: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [150, 34, 54, 55, 135, 333, 45],
        },
        diskUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [2334, 230, 224, 218, 135, 147, 260],
        },
        visitorsDistribution: 399,
      },
    },
    {
      name: "South-Server-1",
      ipAddress: "10.16.1.2",
      status: {
        cpuUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [110, 230, 224, 218, 135, 147, 260],
        },
        ramUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [22, 233, 333, 218, 135, 22, 42],
        },
        views: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [150, 23, 11, 22, 442, 33, 260],
        },
        diskUsage: {
          x: ["08/15", "08/16", "08/17", "08/18", "08/19", "08/20", "08/21"],
          y: [444, 230, 224, 218, 33, 147, 33],
        },
        visitorsDistribution: 188,
      },
    },
  ];
  const [selectedServer, setSelectedServer] = useState(servers[0]);

  const getLineChartOption = (title, { x, y }) => {
    return {
      backgroundColor: "transparent",
      color: ["rgb(211,140,144)"],
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: "20%",
        right: 10,
        bottom: 10,
        left: 10,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: x,
        splitLine: {
          show: true,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          margin: 30,
        },
      },
      series: [
        {
          data: y,
          type: "line",
        },
      ],
    };
  };
  const getPieChartOption = useCallback(() => {
    return {
      backgroundColor: "transparent",
      title: {
        text: "Visitors Distribution",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        left: "center",
        bottom: "5%",
        width: 400,
        formatter: ["{a|{name}}"].join("\n"),
        textStyle: {
          rich: {
            a: {
              width: 160,
              fontSize: 16,
              lineHeight: 12,
            },
          },
        },
      },
      series: [
        {
          name: "Visitors Distribution",
          type: "pie",
          radius: "80%",
          label: {
            show: false,
          },
          data: servers.map((server) => ({
            name: server.name,
            value: server.status.visitorsDistribution,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }, [servers]);

  return (
    <div className="server-status-container">
      <select
        name="server"
        className="server-selector"
        value={selectedServer.ipAddress}
        onChange={(e) =>
          setSelectedServer(
            servers.find((server) => server.ipAddress === e.target.value),
          )
        }
      >
        {servers.map((server) => {
          return <option value={server.ipAddress}>{server.name}</option>;
        })}
      </select>
      <div className="server-status-content">
        <div className="server-status-chart">
          <ReactECharts
            theme="dark"
            autoResize
            style={{ height: "100%" }}
            option={getLineChartOption("Cpu Usage", {
              x: selectedServer.status.cpuUsage.x,
              y: selectedServer.status.cpuUsage.y,
            })}
          />
        </div>

        <div className="server-status-chart">
          <ReactECharts
            theme="dark"
            autoResize
            style={{ height: "100%" }}
            option={getLineChartOption("Ram Usage", {
              x: selectedServer.status.ramUsage.x,
              y: selectedServer.status.ramUsage.y,
            })}
          />
        </div>

        <div
          className="server-status-chart"
          style={{ gridRowStart: 1, gridRowEnd: 3, gridColumnStart: 3 }}
        >
          <ReactECharts
            theme="dark"
            autoResize
            style={{ height: "100%" }}
            option={getPieChartOption()}
          />
        </div>

        <div className="server-status-chart">
          <ReactECharts
            theme="dark"
            autoResize
            style={{ height: "100%" }}
            option={getLineChartOption("Views", {
              x: selectedServer.status.views.x,
              y: selectedServer.status.views.y,
            })}
          />
        </div>

        <div className="server-status-chart">
          <ReactECharts
            theme="dark"
            autoResize
            style={{ height: "100%" }}
            option={getLineChartOption("Disk Usage", {
              x: selectedServer.status.diskUsage.x,
              y: selectedServer.status.diskUsage.y,
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default ServerStatus;
