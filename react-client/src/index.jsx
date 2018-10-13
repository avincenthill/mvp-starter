import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // TBD
  }

  render() {
    return (
      <div>
        <div>App</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));