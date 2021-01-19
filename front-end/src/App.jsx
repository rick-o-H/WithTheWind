import { hot } from 'react-hot-loader/root';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
// import Segments from './sampleData';

const App = () => (
  <div>
    <div>
      <NavBar />
    </div>
    <div>
      <InfoBar />
    </div>
  </div>
);

export default hot(App);
