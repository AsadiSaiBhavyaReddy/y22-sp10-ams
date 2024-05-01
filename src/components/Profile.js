import React, { useState } from 'react';

export default function Profile() {
    const [result, setResult] = useState([
        { name: "John Doe", email: "john@gmail.com", role: 1 },
        { name: "Jane Doe", email: "jane@gmail.com", role: 2 },
        { name: "Alice", email: "alice@gmail.com", role: 1 },
        { name: "Bob", email: "bob@gmail.com", role: 2 },
    ]);

    const handleDelete = (name) => {
        setResult(result.filter(user => user.name !== name));
    };

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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
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
    },
};
