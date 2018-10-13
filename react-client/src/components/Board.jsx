import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Board extends React.Component {
  constructor(props) {
    super(props);

    const cells = [];
    for (let i = 0; i < this.props.gameState.numRows; i += 1) {
      for (let j = 0; j < this.props.gameState.numCols; j += 1) {
        const newCell = {
          row: i,
          col: j,
          selected: false,
          hovered: false,
        }
        cells.push(newCell);
      }
    }

    this.state = {
      boardLength: null,
      boardWidth: null,
      cells: cells,
      lastHoveredCell: null,
    };
    this.hover.bind(this);
    this.unhover.bind(this);

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

  hover(cell) {
    cell.hovered = true;
    this.setState({ lastHoveredCell: cell });
  }

  unhover(cell) {
    cell.hovered = false;
  }

  render() {
    return (
      <div>
        <div>Welcome to Fizzbang!</div>
        <svg className='board'>
          {this.state.cells.map((cell) => {
            let style;
            if (cell.hovered) {
              style = { fill: `white` };
            } else {
              style = { fill: `black`, stroke: 'white', strokeWidth: .25 };
            }

            if (this.state.boardLength && this.state.boardHeight) {
              return <rect
                className='cell'
                key={[cell.row, cell.col]}
                x={(this.state.boardLength / this.props.gameState.numCols) * cell.col}
                y={(this.state.boardHeight / this.props.gameState.numRows) * cell.row}
                width={(this.state.boardLength / this.props.gameState.numCols)}
                height={Math.floor((this.state.boardHeight / this.props.gameState.numRows))}
                style={style}
                onMouseEnter={() => this.hover(cell)}
                onMouseLeave={() => this.unhover(cell)}
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