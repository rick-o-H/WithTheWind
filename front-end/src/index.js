import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import './styles.css';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#e3f2fd',
      },
      secondary: {
        main: '#ff8a80',
      },
    },
  },
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);
