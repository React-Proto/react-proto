import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftContainer from './LeftContainer.jsx';
import MainContainer from './MainContainer.jsx';
import RightContainer from './RightContainer.jsx';
import convertIdToObjs from '../utils/convertIdsToObjs.util';

const mapStateToProps = store => ({
  components: store.components.components,
});

class AppContainer extends Component {
  state = {
    width: 25,
    rightColumnOpen: true,
  }

  collapseColumn = () => {
    if (this.state.width === 25) {
      this.setState({
        width: 0,
        rightColumnOpen: false,
      });
    } else {
      this.setState({
        width: 25,
        rightColumnOpen: true,
      });
    }
  }

  render() {
    const { components } = this.props;
    const { width, rightColumnOpen } = this.state;
    const updatedComponents = convertIdToObjs(components);

    return (
      <div className="app-container">
        <LeftContainer components={updatedComponents} />
        <MainContainer
          components={updatedComponents}
          collapseColumn={this.collapseColumn}
          width={width}
          rightColumnOpen={rightColumnOpen}
        />
        <RightContainer
          width={width}
          components={updatedComponents}
          rightColumnOpen={rightColumnOpen}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppContainer);

AppContainer.propTypes = {
  components: PropTypes.array,
};
