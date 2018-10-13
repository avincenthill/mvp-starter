import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Console from './Console.jsx';
import helpers from '../helpers/helpers';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardLength: null,
      boardWidth: null,
      cells: [[]],
      selected: null,
      msg: 'Please select a cell...',
      turn: 0,
      currentPlayer: 1,
      numRows: 40,
      numCols: 100,
    };

    this.select.bind(this);
  }

  initCells() {
    // TBD make this a matrix
    const cells = [];
    for (let i = 0; i < this.state.numRows; i += 1) {
      let newRow = [];
      for (let j = 0; j < this.state.numCols; j += 1) {
        const rand = helpers.normalize(Math.random(), 1, 100);
        const longitude = helpers.normalize(j - this.state.numCols / 2, this.state.numCols / 2, 100);
        const latitude = helpers.normalize(i - this.state.numRows / 2, this.state.numRows / 2, 100);
        const newCell = {
          row: i,
          col: j,
          key: `${i},${j}`,
          population: 0,
          isLand: false,
          isWater: false,
          isArctic: false,
          rand,
          longitude,
          latitude,
        }
        newRow.push(newCell);
      }
      cells.push(newRow);
    }

    // decorate cells
    cells.forEach((row, index) => {
      row.forEach((cell, index) => {
        const long = Math.abs(cell.longitude);
        const lat = Math.abs(cell.latitude);

        cell.isLand = long + cell.rand / 3 > 45;
        cell.isArctic = helpers.normalize(long + lat / 10 + cell.rand / 3, 200, 100) < 20;

        cell.population = Math.floor(cell.rand * 1000000);

        if (cell.isLand) {
          cell.style = { fill: `rgba(${34},${139},${34},${1})` };
        } else {
          cell.style = { fill: `rgba(${30},${144},${255},1)` };
        }

        if (cell.isArctic) {
          cell.style = { fill: `rgba(${255},${255},${255},1)` };
        }
      })
    })

    this.setState({ cells: cells });
  }

  componentDidMount() {
    this.initCells();
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
      msg: `You selected ${JSON.stringify(cell)}`
    });
  }

  render() {
    return (
      <div>
        <svg className='board'>
          {
            this.state.cells.map((row) => {
              return row.map((cell) => {
                if (this.state.boardLength && this.state.boardHeight) {
                  return <rect
                    className='cell'
                    key={cell.key}
                    x={(this.state.boardLength / this.state.numCols) * cell.col}
                    y={(this.state.boardHeight / this.state.numRows) * cell.row}
                    width={(this.state.boardLength / this.state.numCols)}
                    height={Math.floor((this.state.boardHeight / this.state.numRows))}
                    style={cell.style}
                    onClick={() => this.select(cell)}
                  />
                }
              })
            })
          }
        </svg>
        <Console msg={this.state.msg}></Console>
      </div>
    );
  }
}

Board.propTypes = {
  // TBD
};

export default Board;