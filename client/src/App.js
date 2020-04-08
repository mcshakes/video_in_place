import React from 'react';
import logo from './logo.svg';
import VideoManager from './pages/VideoManager';
import './App.sass';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome To Streamer</h1>
        </header>
        <VideoManager />
      </div>
    );
  }

}

export default App;
