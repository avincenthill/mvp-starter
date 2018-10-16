import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Console from './Console.jsx';
import helpers from '../helpers/helpers';

const numeral = require('numeral');

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardLength: null,
      boardWidth: null,
      cells: [[]],
      selected: null,
      console1: 'Click anywhere to begin thermonuclear war...',
      console2: '',
      console3: '',
      turn: 0,
      currentPlayer: 1,
      currentPlayerName: 'Capitalista',
      numRows: 40,
      numCols: 100,
      player1Pop: 1,
      player2Pop: 1,
      player1StartingPop: 1,
      player2StartingPop: 1,
      isOver: false,
      player1CasualtyPercentage: 0,
      player2CasualtyPercentage: 0,
    };
    this.select.bind(this);
  }

  initCells() {
    const cells = [];
    for (let i = 0; i < this.state.numRows; i += 1) {
      let newRow = [];
      for (let j = 0; j < this.state.numCols; j += 1) {
        const rand = helpers.normalize(Math.random(), 1, 100);
        const longitude = helpers.normalize(j - this.state.numCols / 2, this.state.numCols / 2, 100);
        const latitude = helpers.normalize(i - this.state.numRows / 2, this.state.numRows / 2, 100);
        const absLongitude = Math.abs(longitude);
        const absLatitude = Math.abs(latitude);
        const isLand = helpers.normalize(absLongitude + absLatitude / 5 + rand / 3, 133, 100) > 50;
        let owner = 0;
        if (longitude < 0) {
          owner = 1;
        } else {
          owner = 2;
        }
        let population = 0;
        if (isLand) {
          population = 100;
        }
        const newCell = {
          row: i,
          col: j,
          key: `${i},${j}`,
          population,
          isLand,
          isWater: !isLand,
          isNuked: false,
          owner,
          rand,
          absLongitude,
          absLatitude,
          longitude,
          latitude,
        }
        newRow.push(newCell);
      }
      cells.push(newRow);
    }

    cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.rand > 70) {
          cell.population += 2500;
        }
        if (cell.rand > 75) {
          cell.population += 5000;
        }
        if (cell.rand > 90) {
          cell.population += 10000;
        }
        if (cell.rand > 95) {
          cell.population += 25000;
        }
        if (cell.rand > 98) {
          if (cells[cell.row + 1] && cells[cell.row + 1][cell.col]) {
            cells[cell.row + 1][cell.col].population += 2000000;
          }
          if (cells[cell.row - 1] && cells[cell.row - 1][cell.col]) {
            cells[cell.row - 1][cell.col].population += 2000000;
          }
          if (cells[cell.row][cell.col + 1]) {
            cells[cell.row][cell.col + 1].population += 2000000;
          }
          if (cells[cell.row][cell.col - 1]) {
            cells[cell.row][cell.col - 1].population += 2000000;
          }
          cell.population += 4000000;
        }
        if (cell.isWater) {
          cell.population = 0;
        }
      })
    })

    return cells;
  }

  styleCells(cells) {
    cells.forEach((row) => {
      row.forEach((cell) => {
        let colorString;
        if (cell.isLand) {
          if (cell.owner === 1) {
            colorString = 'rgba(0,0,255,'
          }
          if (cell.owner === 2) {
            colorString = 'rgba(255,0,0,'
          }

          let opacity = '1)'
          if (cell.population > 50000) {
            opacity = '.8)'
          }
          if (cell.population > 100000) {
            opacity = '.7)'
          }
          if (cell.population > 100000) {
            opacity = '.6)'
          }
          if (cell.population > 500000) {
            opacity = '.5)'
          }
          colorString += opacity;

          if (cell.population > 3000000) {
            colorString = 'rgba(0,0,0)'
          }
        }
        if (cell.isWater) {
          colorString = 'rgba(30,144,255,1)'
        }
        if (cell.isNuked) {
          colorString = 'rgba(255,255,0,1)'
        }
        cell.style = { fill: `${colorString}` };
      })
    })
    this.setState({ cells: cells });
  }

  componentDidMount() {
    this.styleCells(this.initCells());
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
  }

  decorate(cell, changes) {
    const newCell = cell;
    Object.keys(changes).forEach((key) => {
      newCell[key] = changes[key];
    })
    const cells = this.state.cells;
    cells[cell.row][cell.col] = newCell;
    this.setState({
      cells,
    });
  }

  select(cell) {
    if (this.state.turn) {
      this.nuke(cell, 6);
      this.setState({
        selected: cell,
        // console3: `\n ${JSON.stringify(cell)}`
      });
    }
    this.next();
  }

  nuke(cell, spread) {
    if (spread > 0) {
      const newPop = Math.floor(cell.population * .1);
      this.decorate(cell, {
        population: newPop,
        isNuked: true,
      });
      if (this.state.cells[cell.row + 1] && this.state.cells[cell.row + 1][cell.col] && Math.random() + .1 > 1 / spread) {
        this.nuke(this.state.cells[cell.row + 1][cell.col], spread - 1);
      }
      if (this.state.cells[cell.row - 1] && this.state.cells[cell.row - 1][cell.col] && Math.random() + .1 > 1 / spread) {
        this.nuke(this.state.cells[cell.row - 1][cell.col], spread - 1);
      }
      if (this.state.cells[cell.row][cell.col + 1] && Math.random() + .1 > 1 / spread) {
        this.nuke(this.state.cells[cell.row][cell.col + 1], spread - 1);
      }
      if (this.state.cells[cell.row][cell.col - 1] && Math.random() + .1 > 1 / spread) {
        this.nuke(this.state.cells[cell.row][cell.col - 1], spread - 1);
      }
    }
  }

  gameLoop() {
    let newPlayer1Pop = 0;
    let newPlayer2Pop = 0;
    this.state.cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isNuked) {
          const newPop = Math.floor(cell.population * .75);
          let isNuked = true;
          if (Math.random() > .7) {
            isNuked = false;
          }
          this.decorate(cell, {
            population: newPop,
            isNuked,
          });
        }

        if (cell.isNuked && this.state.cells[cell.row][cell.col + 1]) {
          if (Math.random() > .7) {
            this.decorate(this.state.cells[cell.row][cell.col + 1], {
              isNuked: true,
            });
          }
        }


        if (cell.longitude < 0) {
          newPlayer1Pop += cell.population;
        } else {
          newPlayer2Pop += cell.population;
        }
      })
    })

    let player1CasualtyPercentage;
    let player2CasualtyPercentage;
    if (this.state.player1StartingPop === 1) {
      player1CasualtyPercentage = 0;
      player2CasualtyPercentage = 0;
    } else {
      player1CasualtyPercentage = Math.floor((1 - (newPlayer1Pop / this.state.player1StartingPop)) * 100);
      player2CasualtyPercentage = Math.floor((1 - (newPlayer2Pop / this.state.player2StartingPop)) * 100);
    }

    this.setState({
      console2: `Capitalistica has a population of ${numeral(newPlayer1Pop).format('0,0')} (${player1CasualtyPercentage}% casualties)\nCommunistico has a population of ${numeral(newPlayer2Pop).format('0,0')} (${player2CasualtyPercentage}% casualties)`
    });
    if (this.state.turn === 0) {
      this.setState({
        player1StartingPop: newPlayer1Pop,
        player2StartingPop: newPlayer2Pop,
        player1CasualtyPercentage,
        player2CasualtyPercentage,
      });
    } else {
      this.setState({
        player1Pop: newPlayer1Pop,
        player2Pop: newPlayer2Pop,
        player1CasualtyPercentage,
        player2CasualtyPercentage,
      });
    }
  }

  next() {
    let readout = '';
    const lastTurn = this.state.turn;
    const thisTurn = lastTurn + 1;
    let currentPlayer;
    let currentPlayerName;
    if (thisTurn % 2 === 0) {
      currentPlayerName = 'Capitalistica';
      currentPlayer = 1;
    } else {
      currentPlayerName = 'Communistico';
      currentPlayer = 2;
    }
    if (this.state.player1CasualtyPercentage > 75) {
      readout = `Communistico wins by inflicting 75% on the Capitalistica`;
    } else if (this.state.player2CasualtyPercentage > 75) {
      readout = `Communistico wins by inflicting 75% on the Capitalistica`;
    } else {
      this.gameLoop();
      readout = `Turn ${thisTurn}. It is ${currentPlayerName}'s turn to launch ${1} ICBM(s)...`;
    }

    this.setState({
      turn: thisTurn,
      console1: readout,
      currentPlayer,
      currentPlayerName,
    });

    this.styleCells(this.state.cells);
  }

  render() {
    return (
      <div>
        <Console console={this.state.console1}></Console>
        <svg className='board'>
          {
            this.state.cells.map((row) => {
              return row.map((cell) => {
                if (this.state.boardLength && this.state.boardHeight) {
                  return (
                    <rect
                      className='cell'
                      key={cell.key}
                      x={(this.state.boardLength / this.state.numCols) * cell.col}
                      y={(this.state.boardHeight / this.state.numRows) * cell.row}
                      width={(this.state.boardLength / this.state.numCols)}
                      height={Math.floor((this.state.boardHeight / this.state.numRows))}
                      style={cell.style}
                      onClick={() => this.select(cell)}
                    />
                  )
                }
              })
            })
          }
        </svg>
        <Console console={this.state.console2}></Console>
        <Console console={this.state.console3}></Console>
      </div>
    );
  }
}

Board.propTypes = {
  // TBD
};

export default Board;