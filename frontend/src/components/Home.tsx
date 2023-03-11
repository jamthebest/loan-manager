import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Home = () => {
    return (
        <Box>
            <Box sx={{ p: 6 }}>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6}>
                        <Typography variant='h4' sx={{ mb: 3 }}>
                            Welcome to Loan Manager
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            Start management your loans.
                        </Typography>
                        <Button variant='contained' sx={{ mr: 2 }}>
                            Sing-in
                        </Button>
                        <Button variant='outlined'>Sign-up</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 340 }}
                                image="/img/loan-image.png"
                                title="green iguana"
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
