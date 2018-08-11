import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {
  toggleDragging, openExpansionPanel, handleTransform, createApplication,
} from '../actions/components';
import KonvaStage from '../components/KonvaStage.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';
import createModal from '../utils/createModal.util';
import Info from '../components/Info.jsx';

const { ipcRenderer } = require('electron');

const mapDispatchToProps = dispatch => ({
  handleTransformation: (id, {
    x, y, width, height,
  }) => dispatch(handleTransform(id, {
    x, y, width, height,
  })),
  toggleComponetDragging: status => dispatch(toggleDragging(status)),
  openPanel: componentId => dispatch(openExpansionPanel(componentId)),
  createApp: ({
    path, components, genOption, repoUrl,
  }) => dispatch(createApplication({
    path, components, genOption, repoUrl,
  })),
});

const mapStateToProps = store => ({
  totalComponents: store.workspace.totalComponents,
});

class MainContainer extends Component {
  state = {
    repoUrl: '',
    image: '',
    modal: null,
    genOptions: ['Export into existing project.', 'Export with create-react-app.', 'Export with starter repo'],
    genOption: 0,
    draggable: false,
    scaleX: 1,
    scaleY: 1,
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);

    ipcRenderer.on('new-file', (event, file) => {
      const image = new window.Image();
      image.src = file;
      image.onload = () => {
        this.setState({ image });
      };
      this.draggableItems = [];
    });

    ipcRenderer.on('app_dir_selected', (event, path) => {
      const { components } = this.props;
      const { genOption, repoUrl } = this.state;
      this.props.createApp({
        path, components, genOption, repoUrl,
      });
    });
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.state.image;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image,
      });
    };
  }

  handleChange = (event) => {
    this.setState({ repoUrl: event.target.value.trim() });
  }

  updateImage = () => {
    ipcRenderer.send('update-file');
  }

  increaseHeight = () => {
    this.setState({
      scaleX: this.state.scaleX * 1.5,
      scaleY: this.state.scaleY * 1.5,
    });
  }

  decreaseHeight = () => {
    this.setState({
      scaleX: this.state.scaleX * 0.75,
      scaleY: this.state.scaleY * 0.75,
    });
  }

  deleteImage = () => this.setState({ image: '' });

  closeModal = () => this.setState({ modal: null });

  chooseAppDir = () => ipcRenderer.send('choose_app_dir');

  toggleDrag = () => {
    this.props.toggleComponetDragging(this.state.draggable);
    this.setState({
      draggable: !this.state.draggable,
    });
  }

  showImageDeleteModal = () => {
    const { closeModal, deleteImage } = this;
    this.setState({
      modal: createModal({
        closeModal,
        message: 'Are you sure you want to delete image?',
        secBtnLabel: 'Delete',
        secBtnAction: deleteImage,
      }),
    });
  }

  displayUrlModal = () => {
    const { closeModal, chooseAppDir } = this;
    const children = <TextField
      id='url'
      label='Repository URL'
      placeholder='https://github.com/kriasoft/react-starter-kit.git'
      margin='normal'
      onChange={this.handleChange}
      name='repoUrl'
      style={{ width: '95%' }}
    />;
    this.setState({
      modal: createModal({
        closeModal,
        children,
        message: 'Enter repository URL:',
        primBtnLabel: 'Accept',
        primBtnAction: () => { chooseAppDir(); closeModal(); },
        secBtnLabel: 'Cancel',
        secBtnAction: () => { this.setState({ repoUrl: '' }); closeModal(); },
      }),
    });
  }

  chooseGenOptions = (genOption) => {
    // set option
    this.setState({ genOption });
    // closeModal
    this.closeModal();
    if (genOption === 2) {
      this.displayUrlModal();
    } else {
      // Choose app dir
      this.chooseAppDir();
    }
  }

  showGenerateAppModal = () => {
    const { closeModal, chooseGenOptions } = this;
    const { genOptions } = this.state;
    const children = <List className='export-preference'>{genOptions.map(
      (option, i) => <ListItem key={i} button onClick={() => chooseGenOptions(i)} style={{ border: '1px solid #3f51b5', marginBottom: '2%', marginTop: '5%' }}>
        <ListItemText primary={option} style={{ textAlign: 'center' }}/>
      </ListItem>,
    )}
    </List>;
    this.setState({
      modal: createModal({
        closeModal,
        children,
        message: 'Choose export preference:',
      }),
    });
  }

  render() {
    const {
      image, draggable, scaleX, scaleY, modal,
    } = this.state;
    const {
      components,
      handleTransformation,
      openPanel,
      totalComponents,
      collapseColumn,
      rightColumnOpen,
    } = this.props;
    const {
      increaseHeight,
      decreaseHeight,
      updateImage,
      toggleDrag,
      main,
      showImageDeleteModal,
      showGenerateAppModal,
    } = this;

    return (
      <div className="main-container">
        <MainContainerHeader
          image={image}
          increaseHeight={increaseHeight}
          decreaseHeight={decreaseHeight}
          showImageDeleteModal={showImageDeleteModal}
          showGenerateAppModal={showGenerateAppModal}
          updateImage={updateImage}
          toggleDrag={toggleDrag}
          totalComponents={totalComponents}
          collapseColumn={collapseColumn}
          rightColumnOpen={rightColumnOpen}
          components={components}
        />
        <div className="main" ref={main}>
          {
            components.length > 0 || image ? (
              <KonvaStage
                scaleX={scaleX}
                scaleY={scaleY}
                image={image}
                draggable={draggable}
                components={components}
                handleTransform={handleTransformation}
                openExpansionPanel={openPanel}
              />
            ) : <Info />
          }
        </div>
        {modal}
      </div>
    );
  }
}

MainContainer.propTypes = {
  components: PropTypes.array.isRequired,
  handleTransformation: PropTypes.func.isRequired,
  toggleComponetDragging: PropTypes.func.isRequired,
  totalComponents: PropTypes.number.isRequired,
  openPanel: PropTypes.func.isRequired,
  collapseColumn: PropTypes.func.isRequired,
  createApp: PropTypes.func.isRequired,
  rightColumnOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
