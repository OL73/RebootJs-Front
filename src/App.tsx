import React from 'react';
import './App.css';
import AppLayout from './Layout/components/AppLayout';
import { Router } from 'react-router-dom';
import history from './history';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';
import store from './store';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from './appReducer';
import { Action } from 'redux';
import { makeInitApp } from './Layout/actions/makeInitApp';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: {
      main: "#B4B0B0"
    },
    error: red,
  },
});

(store.dispatch as ThunkDispatch<IAppState, void, Action>)(makeInitApp());

function App() {

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppLayout />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
