import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Console from './Console.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    const cells = [];
    for (let i = 0; i < this.props.gameState.numRows; i += 1) {
      for (let j = 0; j < this.props.gameState.numCols; j += 1) {
        const newCell = {
          row: i,
          col: j,
          key: `${i},${j}`,
        }
        cells.push(newCell);
      }
    }

    this.state = {
      boardLength: null,
      boardWidth: null,
      cells: cells,
      selected: null,
      msg: 'Welcome to Fizzbang!',
    };
    this.select.bind(this);
  }

  componentDidMount() {
    this.updateBoardDims();
  }

  updateBoardDims() {
    const boardElement = document.getElementsByClassName("board")[0];

    const getDimsAndUpdate = () => {
      const currentRect = boardElement.getBoundingClientRect();
      this.setState({
        boardLength: Math.floor(currentRect.width),
        boardHeight: Math.floor(currentRect.height),
      })
    }

    getDimsAndUpdate();
    // setInterval(getDimsAndUpdate, 100);
  }

  select(cell) {
    this.setState({
      selected: cell,
      msg: `You selected cell ${cell.key}`
    });
  }

  render() {
    return (
      <div>
        <Console msg={this.state.msg}></Console>
        <svg className='board'>
          {this.state.cells.map((cell) => {
            let style;
            if (cell === this.state.lastHoveredCell) {
              style = { fill: `white` };
            } else if (cell === this.state.selected) {
              style = { fill: `red` };
            } else {
              style = { fill: `black`, stroke: 'white', strokeWidth: .25 };
            }

            if (this.state.boardLength && this.state.boardHeight) {
              return <rect
                className='cell'
                key={cell.key}
                x={(this.state.boardLength / this.props.gameState.numCols) * cell.col}
                y={(this.state.boardHeight / this.props.gameState.numRows) * cell.row}
                width={(this.state.boardLength / this.props.gameState.numCols)}
                height={Math.floor((this.state.boardHeight / this.props.gameState.numRows))}
                style={style}
                onClick={() => this.select(cell)}
              />
            }
          })}
        </svg>
      </div>
    );
  }
}

Board.propTypes = {
  // TBD
};

export default Board;