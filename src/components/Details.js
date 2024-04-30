import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Details() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/display')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ margin: '20px auto', maxWidth: '1200px', padding: '0 20px' }}>
            <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '20px' }}>
                
            </Typography>
            <Grid container spacing={3}>
                {data.map((user) => (
                    <Grid item key={user.sid} xs={12} sm={6} md={4}>
                        <Card variant="outlined" style={{ height: '100%' }}>
                            <CardContent>
                                
                                <Typography variant="body1" gutterBottom>
                                    Automobile Name: {user.sname}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Colours Available: {Array.isArray(user.pstatus) ? user.pstatus.join(', ') : user.pstatus}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Company Name: {user.scompany}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Price: {user.sctc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
