import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { Root } from './routes/Root';
import { LoginPage } from './routes/LoginPage';
import { AdminPage } from './routes/AdminPage';
import { RentalPage } from './routes/RentalPage';
import { ReturnPage } from './routes/ReturnPage';
import { SearchPage } from './routes/SearchPage';
import { ReportPage } from './routes/ReportPage';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
        { index: true, element: <LoginPage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'rental', element: <RentalPage /> },
        { path: 'return', element: <ReturnPage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'report', element: <ReportPage /> }
    ]
}], { future: { v7_normalizeFormMethod: true } });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode >
)
