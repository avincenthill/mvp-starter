import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Console extends Component {
  render() {
    return (
      <div className='console'>
        {this.props.console}
      </div>
    );
  }
}

Console.propTypes = {
  // tbd
};

export default Console;