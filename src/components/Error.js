import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Error() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ backgroundColor: '#FFCDD2', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', height: '200px', marginTop: '-300px' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', paddingTop: '20px' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#000000' }}>
                        You are not logged in as a permitted user
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
