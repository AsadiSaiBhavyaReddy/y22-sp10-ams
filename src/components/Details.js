import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Details() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Sample car data
        const cars = [
            { sid: 1, sname: "Toyota Camry", pstatus: ["Black", "White", "Red"], scompany: "Toyota", sctc: "₹25,00,000" },
            { sid: 2, sname: "Honda Civic", pstatus: ["Blue", "Silver", "Gray"], scompany: "Honda", sctc: "₹22,00,000" },
            { sid: 3, sname: "Ford Mustang", pstatus: ["Yellow", "Black", "Red"], scompany: "Ford", sctc: "₹35,00,000" },
            { sid: 4, sname: "Chevrolet Corvette", pstatus: ["Red", "White", "Blue"], scompany: "Chevrolet", sctc: "₹65,00,000" },
            { sid: 5, sname: "BMW 3 Series", pstatus: ["Black", "White", "Blue"], scompany: "BMW", sctc: "₹40,00,000" },
            { sid: 6, sname: "Mercedes-Benz C-Class", pstatus: ["Silver", "White", "Black"], scompany: "Mercedes-Benz", sctc: "₹45,00,000" },
            { sid: 7, sname: "Audi A4", pstatus: ["Gray", "White", "Blue"], scompany: "Audi", sctc: "₹38,00,000" },
            { sid: 8, sname: "Tesla Model 3", pstatus: ["Black", "White", "Blue"], scompany: "Tesla", sctc: "₹42,00,000" },
            { sid: 9, sname: "Nissan Altima", pstatus: ["Black", "Silver", "Red"], scompany: "Nissan", sctc: "₹24,00,000" },
            { sid: 10, sname: "Kia Optima", pstatus: ["Red", "Black", "White"], scompany: "Kia", sctc: "₹23,00,000" },
            { sid: 11, sname: "Subaru Outback", pstatus: ["Blue", "Gray", "Green"], scompany: "Subaru", sctc: "₹28,00,000" },
            { sid: 12, sname: "Hyundai Sonata", pstatus: ["Silver", "White", "Black"], scompany: "Hyundai", sctc: "₹22,00,000" },
            { sid: 13, sname: "Volkswagen Jetta", pstatus: ["White", "Silver", "Gray"], scompany: "Volkswagen", sctc: "₹27,00,000" },
            { sid: 14, sname: "Mazda 6", pstatus: ["Black", "Red", "Blue"], scompany: "Mazda", sctc: "₹26,00,000" },
            { sid: 15, sname: "Lexus ES", pstatus: ["Black", "White", "Silver"], scompany: "Lexus", sctc: "₹50,00,000" },
            { sid: 16, sname: "Infiniti Q50", pstatus: ["Gray", "Black", "Blue"], scompany: "Infiniti", sctc: "₹32,00,000" },
            { sid: 17, sname: "Porsche Panamera", pstatus: ["Black", "White", "Blue"], scompany: "Porsche", sctc: "₹90,00,000" },
            { sid: 18, sname: "Jaguar XF", pstatus: ["Black", "Silver", "Red"], scompany: "Jaguar", sctc: "₹60,00,000" },
            { sid: 19, sname: "Volvo S60", pstatus: ["White", "Gray", "Black"], scompany: "Volvo", sctc: "₹35,00,000" },
            { sid: 20, sname: "Land Rover Range Rover Evoque", pstatus: ["Red", "White", "Black"], scompany: "Land Rover", sctc: "₹80,00,000" },
            { sid: 21, sname: "Acura TLX", pstatus: ["Blue", "Silver", "Black"], scompany: "Acura", sctc: "₹33,00,000" },
            { sid: 22, sname: "Cadillac CT4", pstatus: ["Red", "Black", "White"], scompany: "Cadillac", sctc: "₹39,00,000" },
            { sid: 23, sname: "Lincoln Continental", pstatus: ["Black", "White", "Silver"], scompany: "Lincoln", sctc: "₹48,00,000" },
            { sid: 24, sname: "Buick LaCrosse", pstatus: ["Gray", "Black", "Blue"], scompany: "Buick", sctc: "₹31,00,000" },
            { sid: 25, sname: "Mitsubishi Galant", pstatus: ["White", "Red", "Silver"], scompany: "Mitsubishi", sctc: "₹20,00,000" },
            { sid: 26, sname: "Chrysler 300", pstatus: ["Black", "Gray", "Blue"], scompany: "Chrysler", sctc: "₹30,00,000" },
            { sid: 27, sname: "Genesis G80", pstatus: ["White", "Black", "Silver"], scompany: "Genesis", sctc: "₹55,00,000" },
            { sid: 28, sname: "Bentley Flying Spur", pstatus: ["Black", "White", "Red"], scompany: "Bentley", sctc: "₹1,50,00,000" },
            { sid: 29, sname: "Rolls-Royce Ghost", pstatus: ["Black", "White", "Silver"], scompany: "Rolls-Royce", sctc: "₹3,00,00,000" },
            { sid: 30, sname: "Ferrari Portofino", pstatus: ["Red", "Black", "Yellow"], scompany: "Ferrari", sctc: "₹2,50,00,000" }
        ];

        // Set the sample car data
        setData(cars);
        
        // Normally, you'd use axios to fetch data from an API, for now, we're just using sample data
        // axios.get('http://localhost:8081/display')
        //     .then(response => setData(response.data))
        //     .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ margin: '20px auto', maxWidth: '1200px', padding: '0 20px' }}>
            <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '20px' }}>
                Car Details
            </Typography>
            <Grid container spacing={3}>
                {data.map((car) => (
                    <Grid item key={car.sid} xs={12} sm={6} md={4}>
                        <Card variant="outlined" style={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    Automobile Name: {car.sname}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Colours Available: {Array.isArray(car.pstatus) ? car.pstatus.join(', ') : car.pstatus}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Company Name: {car.scompany}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Price: {car.sctc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
