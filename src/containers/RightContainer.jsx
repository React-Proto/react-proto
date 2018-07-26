import React, { Component } from 'react';
import SortableComponents from '../components/SortableComponents.jsx'

export default class RightContainer extends Component {
  render() {
    return (
      <div className="column">
        <SortableComponents />
      </div>
    );
  }
}
