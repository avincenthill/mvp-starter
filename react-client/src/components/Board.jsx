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
      console2: 'Welcome to Fizzbang!',
      console1: 'Please select a cell...',
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
        cell.isLand = helpers.normalize(long + lat / 5 + cell.rand / 3, 133, 100) > 50;


        if (cell.rand > 80 && cell.isLand) {
          cell.population = 50000
        } if (cell.rand > 90 && cell.isLand) {
          cell.population = 100000
        } if (cell.rand > 95 && cell.isLand && long > 50) {
          cell.population = 250000
        } if (cell.rand > 96 && cell.isLand && long > 50) {
          cell.population = 500000
        } if (cell.rand > 98 && cell.isLand && long > 50) {
          cell.population = 5000000
        } else if (cell.isLand && cell.population === 0) {
          cell.population = Math.floor(1 + cell.rand * 1000);
        }


        if (cell.isLand) {
          cell.style = { fill: `rgba(${34},${139},${34},${50000 / cell.population})` };
        } else {
          cell.isWater = true;
          cell.style = { fill: `rgba(${30},${144},${255},1)` };
        }

        cell.isArctic = helpers.normalize(long + lat / 10 + cell.rand / 3, 200, 100) < 20;
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
      console1: `You selected ${JSON.stringify(cell)}`
    });
  }

  render() {
    return (
      <div>
        <Console console={this.state.console2}></Console>
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
        <Console console={this.state.console1}></Console>
      </div>
    );
  }
}

Board.propTypes = {
  // TBD
};

export default Board;