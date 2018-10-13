import React from 'react';
import ReactDOM from 'react-dom';
import Triangle from './components/Triangle.jsx'
import Board from './components/Board.jsx'
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createVerticesTraingle(length, svgSize) {
    let vertices = [];
    vertices.push([(svgSize / 2) - (length / 2), svgSize]);
    vertices.push([svgSize / 2, svgSize - (length * Math.sqrt(3) / 2)]);
    vertices.push([(svgSize / 2) + (length / 2), svgSize])
    return vertices;
  }

  render() {
    return (
      <div>
        {/* <svg width={1000} height={1000}>
          <Triangle vertices={this.createVerticesTraingle(500, 200)} color="#FF8EAC" delay={0} />
        </svg> */}
        <Board></Board>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));