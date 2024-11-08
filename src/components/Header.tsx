import { Button, Box, Typography, Stack, Divider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import { HeaderProps } from '../utils/props';
import { Album } from '@mui/icons-material';

export const Header = ({ loggedIn, setLoggedIn, setUser }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <Box component='nav' sx={{
            p: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#090909'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Album fontSize='large' />
                <Typography variant='h1' sx={{ fontSize: '2rem', ml: '1rem' }}>Brew City Rentals</Typography>
            </Box>
            {loggedIn &&
                <Stack direction='row' spacing={2}>
                    <Divider orientation='vertical' flexItem />
                    <NavLink to='/admin'>
                        <Button>Admin Portal</Button>
                    </NavLink>
                    <Divider orientation='vertical' flexItem />
                    <NavLink to='/rental'>
                        <Button>New Rental</Button>
                    </NavLink>
                    <Divider orientation='vertical' flexItem />
                    <NavLink to='/search'>
                        <Button>Search Inventory</Button>
                    </NavLink>
                    <Divider orientation='vertical' flexItem />
                    <NavLink to='/report'>
                        <Button>Generate Reports</Button>
                    </NavLink>
                    <Divider orientation='vertical' flexItem />
                    <Button onClick={() => {setLoggedIn(false); setUser(null); navigate('/');}}>Log Out</Button>
                    <Divider orientation='vertical' flexItem />
                </Stack>
            }
        </Box>
    );
}
