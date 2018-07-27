import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/components';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel.jsx';

const mapStateToProps = store => ({
  components: store.components,
  
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
    console.log(this.props)
    const { addComponent, components  } = this.props;
    const { inputValue } = this.state;

    return (
      <div className="column left">
        <input type="text" placeholder="Add Component" onChange={event => this.handleChange(event)} />
        <button onClick={() => addComponent(inputValue)}>Add</button>
        {components.map((component, i) => <LeftColExpansionPanel key={i} name={component.name} /> )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);

