import { Copyright } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box component='footer' sx={{
            display: 'flex',
            bgcolor: '#090909',
            alignItems: 'center',
            p: '1rem',
            justifyContent: 'flex-end'
        }}>
            <Typography sx={{ mr: '1rem' }}>Brew City Rentals 2024</Typography>
            <Copyright />
        </Box>
    );
}
