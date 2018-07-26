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
    inputValue: '',
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    const { addComponent } = this.props;
    const { inputValue } = this.state;

    return (
      <div className="column">
        <input type="text" placeholder="Add Component" onChange={event => this.handleChange(event)} />
        <button onClick={() => addComponent(inputValue)}>Add</button>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
