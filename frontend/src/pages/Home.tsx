import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Home = () => {
    const [currentUser, setCurrentUser] = useState<AuthStateUserObject | undefined>(undefined);
    const auth = useAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Box>
            <Box sx={{ p: 6 }}>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <Typography variant='h4' sx={{ mb: 3 }}>
                            Welcome to Loan Manager
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            We understand how important it is to keep track of the loans you make to others, and that's why we created this tool to help you manage your lending activity with ease.
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            With our platform, you can easily add and view all your loans in one place, set reminders for due dates, and keep track of payments received. You can also generate reports and analytics to help you make better lending decisions.
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            Our platform is designed with security and privacy in mind, so you can trust that your data is safe and confidential.
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            Whether you're lending money to friends, family, or businesses, our platform can help you stay organized and in control.
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            Sign up today and start managing your lending activity like a pro!
                        </Typography>
                        {!currentUser && <div>
                            <Button variant='contained' sx={{ mr: 2 }} onClick={() => { navigate('/login') }}>
                                Sing-in
                            </Button>
                            <Button variant='outlined'  onClick={() => { navigate('/register') }}>Sign-up</Button>
                        </div>}
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 340 }}
                                image="/img/loan-image.png"
                                title="Loan Manger"
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
