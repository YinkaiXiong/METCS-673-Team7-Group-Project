import React from 'react';
import './serverlist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


function ServerList() {
  const servers = [
    { name: 'Northeast-Server-1', ipAddress: '192.168.1.1' },
    { name: 'Northeast-Server-1', ipAddress: '10.163.1.5' },
    { name: 'West-Server-1', ipAddress: '192.168.1.6' },
    { name: 'South-Server-1', ipAddress: '10.16.1.2' },
  ];

  return (
    <div className="server-list-container">
      <div className="server-list-subheading">
        <div className="server-list">
          <h2>Server List</h2>
        </div>
        <div className="add-server-button">
          <button>Add Server</button>
        </div>
      </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server, index) => (
            <tr key={index}>
              <td>{server.name}</td>
              <td>{server.ipAddress}</td>
              <td>
               <button>
                <FontAwesomeIcon icon={faPencilAlt} /> Edit
               </button>
               <button>
                <FontAwesomeIcon icon={faTrash} /> Delete
               </button>
              </td>
            </tr>
          ))}
          <tr style={{ height: 250 }}>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        </tbody>
      </table>
        </div>
    </div>
  );
}

export default ServerList;