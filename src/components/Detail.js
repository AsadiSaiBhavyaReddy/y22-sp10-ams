
import axios from "axios"; 
import { useState, useEffect } from "react"; 
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent'; 
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button'; 
import Grid from '@mui/material/Grid'; 

import Swal from 'sweetalert2';
 
export default function Detail() { 
    const [data, setData] = useState([]); 
 
    useEffect(() => { 
        axios.get('http://localhost:8081/display') 
            .then(response => setData(response.data)) 
            .catch(error => console.error('Error fetching data:', error)); 
    }, []); 
 
    const handleDelete = (id) => { 
        axios.delete('http://localhost:8081/delete', { params: { id: id } }) 
            .then(response => { 
                console.log(response.data); 
                // Update the data after deletion 
                setData(data.filter(item => item.sid !== id)); 
                Swal.fire({
                    title: "Deleted Successful",
                    
                    icon: "success"
                  });
            }) 
            .catch(error => console.error('Error deleting data:', error)); 
    }; 
 
    return ( 
        <div> 
            <Typography variant="h5" component="h2" gutterBottom> 
                Data 
            </Typography> 
            <Grid container spacing={2}> 
                {data.map((user) => ( 
                    <Grid item key={user.sid} xs={12} sm={6} md={4}> 
                        <Card variant="outlined"> 
                            <CardContent> 
                                <Typography variant="h6" component="h3"> 
                                    SINO: {user.sid} 
                                </Typography> 
                                <Typography variant="body1"> 
                                    Automobile Name: {user.sname} 
                                </Typography> 
                                <Typography variant="body1"> 
                                    Colours Available: {Array.isArray(user.pstatus) ? user.pstatus.join(', ') : user.pstatus} 
                                </Typography> 
                                <Typography variant="body1"> 
                                    Company Name: {user.scompany} 
                                </Typography> 
                                <Typography variant="body1"> 
                                    Price: {user.sctc} 
                                </Typography> 
                                <Button variant="contained" onClick={() => handleDelete(user.sid)}> 
                                    Delete 
                                </Button> 
                            </CardContent> 
                        </Card> 
                    </Grid> 
                ))} 
            </Grid> 
        </div> 
    ); 
}