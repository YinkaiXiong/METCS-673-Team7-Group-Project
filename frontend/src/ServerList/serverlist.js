import React, { useEffect, useState } from "react";
import "./css/serverlist.css";

import update from "../images/Edit Button.png";
import remove from "../images/Delete Button.png";
import addserver from "../images/Add Server Button.png";
import Popup from 'reactjs-popup';
import { AddServer } from "./AddServer";
import { UpdateServer } from "./UpdateServer";

function ServerList() {

  const [servers, setServers] = useState([]);

  const fetchServerList = async () => {
    try {
      const response = await fetch('http://localhost:3000/server/getAllServers');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setServers(data); // Update the state with fetched server data
    } catch (error) {
      console.error('There was a problem fetching the server list:', error);
      // Handle errors, set default server list or show error message
    }
  };

  useEffect(() => {
    fetchServerList(); // Fetch server list when the component mounts
  }, []);



  // function renderServers() {
  //   const serverList = document.getElementById('serverList');
  //   serverList.innerHTML = '';
  //   servers.forEach(server => {
  //     const row = document.createElement('tr');
  //     row.innerHTML = `
  //       <td>${server.name}</td>
  //       <td>${server.id}</td>
  //       <td>
  //         <button id ="delete" onClick=deleteServer('${server.id}')><img src=${remove} alt={"Server Deletion Logo"}/></button>
  //         <button id="update" onClick=updateServer('${server.id}')><img src=${update} alt={"Server Update Logo"}/></button>
  //       </td>
  //     `;
  //     serverList.appendChild(row);
  //   });
  // }

  // Function to delete a server from the table
  const deleteServer = (serverId) => {
    const updatedServers = servers.filter(server => server.id !== serverId);
    setServers(updatedServers);
  }

  // Function to update a server in the table (for demonstration)
  const updateServer = (serverId) => {
    // Simulated update action - you can implement this as required
    const index = servers.findIndex(server => server.id === serverId);
    if (index !== -1) {
      // Implement your update logic here if needed
      // renderServers();
    }
  }


  return (

      <><div className="serverlist-container contain">
      <div className="container">
        <div className="server-list-subheading">
          <div className="server-list">
            <h2>Server Management</h2>
          </div>
          <div className="add-server-button">
          <Popup trigger=
                {<button id="add-server"><img src={addserver} alt="add server button"/></button>} 
                modal nested>
                {
                    close => (
                      <div className="blurred-background">
                      <div className="popup-content">
                        <AddServer />
                        <button className="close-button btn btn-primary" onClick={close}>
                          Close
                        </button>
                      </div>
                    </div>
                    )
                }
            </Popup>
            
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Server Name</th>
                <th>Server IP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map(server => (
                <tr key={server.server_name}>
                  <td>{server.server_name}</td>
                  <td>{server.server_ip}</td>
                  <td>
                    <button id="delete" onClick={() => deleteServer(server.server_name)}><img src={remove} alt={"Server Deletion Logo"} /></button>

                    <Popup trigger=
                {<button id="update">
                <img src={update} alt={"Server Update Logo"} />
              </button>} 
                modal nested>
                {
                    close => (
                      <div className="blurred-background">
                      <div className="popup-content">
                        <UpdateServer serverIp={server.server_ip}  serverName={server.server_name} />
                        <button className="close-button btn btn-primary" onClick={close}>
                          Close
                        </button>
                      </div>
                    </div>
                    )
                }
            </Popup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>

    </div>
    </>

  );
}

export default ServerList;


{/* <div class="message">
<div class="success"><p>Success</p></div>
</div> */}
