import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftContainer from './LeftContainer.jsx';
import MainContainer from './MainContainer.jsx';
import RightContainer from './RightContainer.jsx';
import convertIdToObjs from '../utils/convertIdsToObjs.util';

const mapStateToProps = store => ({
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
});

class AppContainer extends Component {
  render() {
    const { components, totalComponents } = this.props;
    const updatedComponents = convertIdToObjs(components);

    return (
      <div className="app-container">
        <LeftContainer components={updatedComponents} />
        <MainContainer components={updatedComponents} totalComponents={totalComponents}/>
        <RightContainer components={updatedComponents} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppContainer);

AppContainer.propTypes = {
  components: PropTypes.array.isRequired,
  totalComponents: PropTypes.number.isRequired,
};
