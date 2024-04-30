import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Profile() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/show')
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setResult(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = (name) => {
        axios.delete('http://localhost:8081/remove', { params: { name: name } })
            .then(response => {
                console.log(response.data);
                // Update the result after deletion
                setResult(result.filter(user => user.name !== name));
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    const handleAllow = (name) => {
        // Add your logic for 'allow' functionality here
        console.log("Allowing access for user:", name);
        axios.put('http://localhost:8081/allow', { name: name })
            .then(response => {
                console.log(response.data);
                // Assuming the response includes updated user data,
                // update the result state to reflect the changes.
                setResult(result.map(user => user.name === name ? { ...user, allowed: true } : user));
            })
            .catch(error => console.error('Error allowing user:', error));
    };

    const handleRegistration = (userData) => {
        // Assuming you have userData with fields like name, email, role, etc.
        axios.post('http://localhost:8081/register', userData)
            .then(response => {
                console.log(response.data);
                // If the selected user is admin, allow them before successful registration
                if (userData.role === 'admin') {
                    handleAllow(userData.name);
                }
                // Now proceed with registration or display success message
                // For example:
                // Swal.fire({
                //     title: "Registration Successful",
                //     icon: "success"
                // });
            })
            .catch(error => console.error('Error registering user:', error));
    };

    if (result === null) {
        return (
            <div style={styles.container}>
                There is No Data to Display
            </div>
        );
    } else {
        return (
            <div style={styles.container}>
                <h2>User Data</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Name</th>
                            <th style={styles.tableHeader}>Email</th>
                            <th style={styles.tableHeader}>Role</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((user, index) => (
                            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                <td style={styles.tableData}>{user.name}</td>
                                <td style={styles.tableData}>{user.email}</td>
                                <td style={styles.tableData}>{user.role}</td>
                                <td style={styles.tableData}>
                                    <button onClick={() => handleDelete(user.name)} style={styles.deleteButton}>Delete</button>
                                    {!user.allowed && user.role === 'admin' && (
                                        <button onClick={() => handleAllow(user.name)} style={styles.allowButton}>Allow</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const styles = {
    container: {
        margin: '20px',
    },
    table: {
        width: '80%', // Decreased width
        borderCollapse: 'collapse',
        border: '1px solid #ddd',
    },
    tableHeader: {
        padding: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
    },
    tableData: {
        padding: '8px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    oddRow: {
        backgroundColor: '#f9f9f9',
    },
    evenRow: {
        backgroundColor: '#ffffff',
    },
    deleteButton: {
        backgroundColor: 'darkblue',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px', // Add margin to separate buttons
    },
    allowButton: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};
