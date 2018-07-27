import React, { Component } from 'react';
import SortableComponent from '../components/SortableComponent.jsx';

export default class RightContainer extends Component {
  render() {
    return (
      <div className="column right">
        <SortableComponent />
      </div>
    );
  }
}
