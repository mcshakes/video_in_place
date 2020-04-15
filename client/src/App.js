import React from 'react';
import VideoManager from './pages/VideoManager';
import TwilioVideo from 'twilio-video';
import axios from 'axios';
import './sass/MyStyles.scss';
import { TwilioVideoProvider, TwilioVideoConsumer } from "./TwilioContext";


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome To Streamer</h1>
        </header>
        <main>
          <VideoManager data={this.state} />
        </main>



      </div>
    );
  }

}

export default App;
