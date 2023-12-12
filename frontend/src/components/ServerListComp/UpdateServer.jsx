import React, { useEffect } from "react";
import { useUser } from '../../pages/LoginPage/UserContext';

export function UpdateServer({ serverIp, serverName }) {
    const { user } = useUser();
    useEffect(() => {
        document.getElementById('addServerForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const serverName = document.getElementById('server_name').value;
            const serverIP = document.getElementById('server_ip').value;
            const username = document.getElementById('username').value;
            const newPassword = document.getElementById('new_password').value;
            const oldPassword = document.getElementById('old_password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            if (newPassword !== confirmPassword) {
                // Passwords don't match, handle this case as needed (show error message, etc.)
                console.log("Passwords do not match");
                return; // Don't proceed further if passwords don't match
            }

            const formData = {
                server_name: serverName,
                server_ip: serverIP,
                username: username,
                old_password: oldPassword,
                password: newPassword, // Sending only the new password to the backend
                updated_by: user
            };

            // Send POST request to the backend endpoint
            fetch('http://localhost:3000/server/updateServer', {
                method: 'PATCH',
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
    }, []);

    return (
        <>
            <div className="container form-container mt-6">
                <h1 className="text-center mb-4">Update Server</h1>
                <form id="addServerForm">
                    <div className="form-group">
                        <label htmlFor="server_name">Server Name:</label>
                        <input type="text" className="form-control" id="server_name" name="server_name" value={serverName} readOnly required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="server_ip">Server IP:</label>
                        <input type="text" className="form-control" id="server_ip" name="server_ip" value={serverIp} readOnly required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="old_password">Old Password:</label>
                        <input type="password" className="form-control" id="old_password" name="old_password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new_password">New Password:</label>
                        <input type="password" className="form-control" id="new_password" name="new_password" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirm_password">Confirm Password:</label>
                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" required />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </>
    );
}
