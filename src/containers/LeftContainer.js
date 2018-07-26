import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/components';

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({
  addComponent: name => dispatch(actions.addComponent(name)),
});

class LeftContainer extends Component {
  state = {
    input: '',
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  }

  render() {
    return (
      <div className="column">
        <input type="text" placeholder="Add Component" onChange={event => this.handleChange(event)} />
        <button onClick={() => this.props.addComponent(this.state.input)}>Add</button>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
