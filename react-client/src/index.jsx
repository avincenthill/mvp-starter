import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx'
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      currentPlayer: 1,
      numRows: 10,
      numCols: 16,
    };
  }

  render() {
    return (
      <div>
        <Board gameState={this.state}></Board>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));