import "./css/AddServer.css"
import { useEffect } from "react";
import { useUser } from '../../pages/LoginPage/UserContext';

export function AddServer(){
    const { user } = useUser();

    useEffect(()=>{
        document.getElementById('addServerForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            const serverName = document.getElementById('server_name').value;
            const serverIP = document.getElementById('server_ip').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const os_type = document.getElementById('os_type').value;
            const createdBy = user;
            
            const formData = {
                server_name: serverName,
                server_ip: serverIP,
                username: username,
                password: password,
                created_by: createdBy,
                os_type: os_type
            };
            
            // Send POST request to the backend endpoint
            fetch('http://localhost:3000/server/addServer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log(data); // Log the response data
                // Handle success or redirect if needed
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
                // Handle errors, display an error message, etc.
            });
        });

    },[])
    

    return <>
    <div class="container form-container mt-6">
  <h1 class="text-center mb-4">Add Server</h1>
  <form id="addServerForm">
    <div class="form-group">
      <label for="server_name">Server Name:</label>
      <input type="text" class="form-control" id="server_name" name="server_name" required/>
    </div>
    <div class="form-group">
      <label for="server_ip">Server IP:</label>
      <input type="text" class="form-control" id="server_ip" name="server_ip" required/>
    </div>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" class="form-control" id="username" name="username" required/>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" class="form-control" id="password" name="password" required/>
    </div>
    <div class="form-group">
      <label for="os_type">Operating System:</label>
      <input type="os_type" class="form-control" id="os_type" name="os_type" required/>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</div>
    </>
}