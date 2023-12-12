import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Chart as ChartJS } from "chart.js/auto";
import "./css/ServerMetric.css"

const ServerMetrics = () => {
    const [timeLabels, setTimeLabels] = useState([]);
    const [cpuData, setCpuData] = useState([]);
    const [memoryData, setMemoryData] = useState([]);
    const [diskData, setDiskData] = useState([]);
    const [visitorData, setVisitorData] = useState([]);
    const [serverList, setServerList] = useState([]);
    const [selectedServer, setSelectedServer] = useState([]);
    const [serverData, setServerData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const saveChartData = () => {

    }




    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/server/getServerData`);
            const data = await response.json();

            const serverData = data[selectedServer][0];
            const cpu = [];
            const memory = [];
            const disk = [];
            const visitors = [];

            const labels = Object.keys(serverData);

            labels.forEach(time => {
                const data = serverData[time];
                cpu.push(data.cpu_percent);
                memory.push(data.mem_used);
                disk.push(data.disk_used);
                visitors.push(data.active_connections);
            });

            setTimeLabels(labels);
            setCpuData(cpu);
            setMemoryData(memory);
            setDiskData(disk);
            setVisitorData(visitors);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchServerList = () => {
        fetch('http://localhost:3000/server/getAllServers')
            .then((response) => response.json())
            .then((data) => {
                setServerList(data);
                setSelectedServer(data[0].server_name) // Set the retrieved server list
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error('Error fetching server list:', error);
            });
    }
    const handleServerChange = (event) => {
        setSelectedServer(event.target.value);
      };

      useEffect(() => {
        fetchServerList(); // Fetch server list when component mounts
      }, []);
      useEffect(() => {
        if (selectedServer !== '') {
          fetchData(); // Fetch data for the selected server initially
          const intervalId = setInterval(() => {
            fetchData(); // Fetch data for the selected server every minute
          }, 60000);
    
          return () => clearInterval(intervalId); // Cleanup on unmount or server change
        }
      }, [selectedServer]);

    const cpuChart = {
        labels: timeLabels.map(time => moment(time).format('HH:mm')),
        datasets: [
            {
                label: 'CPU Usage %',
                data: cpuData,
                fill: false,
                borderColor: '#6f0000',
                lineTension: 0.2,
                borderWidth: 1,
                pointRadius: 1
            }
        ]
    };
    const visitorChart = {
        labels: timeLabels.map(time => moment(time).format('HH:mm')),
        datasets: [
            {
                label: 'Active Connections',
                data: visitorData,
                fill: false,
                borderColor: '#6f0000',
                lineTension: 0.2,
                borderWidth: 1,
                pointRadius: 1
            }
        ]
    };

    const memoryChart = {
        labels: timeLabels.map(time => moment(time).format('HH:mm')),
        datasets: [
            {
                label: 'Memory Usage (GB)',
                data: memoryData,
                fill: false,
                borderColor: '#dc7c06',
                lineTension: 0.2,
                borderWidth: 1,
                pointRadius: 1
            }
        ]
    };

    const diskChart = {
        labels: timeLabels.map(time => moment(time).format('HH:mm')),
        datasets: [
            {
                label: 'Disk Usage (GB)',
                data: diskData,
                fill: false,
                borderColor: '#026736',
                lineTension: 0.4,
                lineTension: 0.2,
                borderWidth: 1,
                pointRadius: 1
            }
        ]
    };

    return (
        <div className='dashboard'>
            <select
                name="server"
                className="server-selector"
                value={selectedServer.server_name} onChange={handleServerChange}>
                {serverList.map((server) => {
                    return <option key={server.server_name} value={server.server_name}>{server.server_name}</option>;
                })}
            </select>
            <div className="chart-container">
                <div className="chart">
                    <h2>CPU Usage</h2>
                    <Line data={cpuChart} />
                </div>
                <div className="chart">
                    <h2>Memory Usage</h2>
                    <Line data={memoryChart} />
                </div>
                <div className="chart">
                    <h2>Disk Usage</h2>
                    <Line data={diskChart} />
                </div>
                <div className="chart">
                    <h2>Active Connections</h2>
                    <Line data={visitorChart} />
                </div>
            </div>
        </div>
    );
};

export default ServerMetrics;
