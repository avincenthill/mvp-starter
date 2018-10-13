import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx'
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Board ></Board>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));