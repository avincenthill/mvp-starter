import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Board extends React.Component {
  constructor(props) {
    super(props);

    const cells = [];
    for (let i = 0; i < this.props.gameState.numRows; i += 1) {
      for (let j = 0; j < this.props.gameState.numCols; j += 1) {
        cells.push([i, j]);
      }
    }

    this.state = {
      boardLength: null,
      boardWidth: null,
      cells: cells,
    };
    this.handleClick.bind(this);
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

  handleClick() {
    alert(this)
  }

  render() {
    return (
      <div>
        <div>Welcome to Fizzbang!</div>
        <svg className='board'>
          {this.state.cells.map((cell) => {
            // console.log(this.state.boardLength, this.state.boardHeight, this.props.gameState.numRows, this.props.gameState.numCols)
            if (this.state.boardLength && this.state.boardHeight) {
              return <rect
                key={cell}
                x={(this.state.boardLength / this.props.gameState.numCols) * cell[1]}
                y={(this.state.boardHeight / this.props.gameState.numRows) * cell[0]}
                width={(this.state.boardLength / this.props.gameState.numCols)}
                height={Math.floor((this.state.boardHeight / this.props.gameState.numRows))}
                style={{ fill: 'white', stroke: 'black', strokeWidth: '.5px' }}
                onClick={this.handleClick.bind(cell)}
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