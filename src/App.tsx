import React from 'react';
import './App.css';
import AppLayout from './layout/appLayout';
import { Router } from 'react-router-dom';
import history from './history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: {
      main: "#000"
    },
    error: red,
  },
});

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppLayout />
      </ThemeProvider>
    </Router>
  );
}

export default App;
