import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNotifications } from 'react-notifications-component'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import 'react-notifications-component/dist/theme.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#f39314'
        }
    }
});

function App() {

    return (
        <div className="App">
            <ReactNotifications />
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={ <Navigate to="/dash" /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/dash" element={ <Dashboard /> } />
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
