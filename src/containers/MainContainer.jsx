import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../components/theme';
import {
  toggleDragging, openExpansionPanel, handleTransform,
  createApplication, changeImagePath, exportWorkspace,
  importWorkspace,
} from '../actions/components';
import KonvaStage from '../components/KonvaStage.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';
import createModal from '../utils/createModal.util';
import Info from '../components/Info.jsx';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = dispatch => ({
  handleTransformation: (id, {
    x,
    y,
    width,
    height,
  }) => dispatch(handleTransform(id, {
    x,
    y,
    width,
    height,
  })),
  toggleComponetDragging: status => dispatch(toggleDragging(status)),
  openPanel: component => dispatch(openExpansionPanel(component)),
  createApplication: data => dispatch(createApplication(data)),
  changeImagePath: path => dispatch(changeImagePath(path)),
  exportWorkspace: ({
    workspaceFilePath, totalComponents, nextId,
    imagePath, focusComponent, components, nextPropId,
    compProps,
  }) => dispatch(
    exportWorkspace({
      workspaceFilePath,
      totalComponents,
      nextId,
      imagePath,
      focusComponent,
      components,
      nextPropId,
      compProps,
    }),
  ),
  importWorkspace: ({ workspaceFilePath }) => dispatch(importWorkspace({ workspaceFilePath })),
});

const mapStateToProps = store => ({
  totalComponents: store.workspace.totalComponents,
  imagePath: store.workspace.imagePath,
  focusComponent: store.workspace.focusComponent,
  nextId: store.workspace.nextId,
  components: store.workspace.components,
  compProps: store.workspace.compProps,
  nextPropId: store.workspace.nextPropId,
});

class MainContainer extends Component {
  state = {
    repoUrl: '',
    image: '',
    modal: null,
    genOptions: ['Export into existing project.', 'Export with starter repo.', 'Export with create-react-app.'],
    genOption: 0,
    draggable: false,
    toggleClass: true,
    scaleX: 1,
    scaleY: 1,
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);

    IPC.on('new-file', (event, file) => {
      const image = new window.Image();
      image.src = file;
      this.props.changeImagePath(file);
      image.onload = () => {
        this.setState({ image });
      };
      this.draggableItems = [];
    });

    IPC.on('app_dir_selected', (event, path) => {
      const { components, compProps } = this.props;
      const { genOption, repoUrl } = this.state;
      this.props.createApplication({
        path, components, compProps, genOption, repoUrl,
      });
    });

    IPC.on('chosen-workspace', (event, workspaceFilePath) => {
      // Trigger importWorkspace handler via this.props
      this.props.importWorkspace({
        workspaceFilePath,
      });
    });

    IPC.on('new-workspace', (event, workspaceFilePath) => {
      const {
        totalComponents, nextId, imagePath,
        focusComponent, components, nextPropId,
        compProps,
      } = this.props;
      // Trigger exportWorkspace handler via this.props
      this.props.exportWorkspace({
        workspaceFilePath,
        totalComponents,
        nextId,
        imagePath,
        focusComponent,
        components,
        nextPropId,
        compProps,
      });
    });
  }

  setImage = () => {
    const image = new window.Image();
    image.src = this.props.imagePath;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image,
      });
    };
  }

  componentDidMount() {
    this.setImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.imagePath !== prevProps.imagePath) {
      if (this.props.imagePath === '') {
        this.deleteImage();
      } else {
        this.setImage();
      }
    }
  }

  handleChange = (event) => {
    this.setState({ repoUrl: event.target.value.trim() });
  }

  updateImage = () => {
    IPC.send('update-file');
  }

  /*
   * openWorkspace: Emit an event 'open_workspace'
   *                via IPC to electron menus
   */
  openWorkspace = () => {
    IPC.send('open_workspace');
  }

  /*
   * saveWorkspace: Emit an event 'save_workspace'
   *                via IPC to electron menus
   */
  saveWorkspace = () => {
    IPC.send('save_workspace');
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

  deleteImage = () => {
    this.props.changeImagePath('');
    this.setState({ image: '' });
  };

  closeModal = () => this.setState({ modal: null });

  chooseAppDir = () => IPC.send('choose_app_dir');

  toggleDrag = () => {
    this.props.toggleComponetDragging(this.state.draggable);
    this.setState({
      toggleClass: !this.state.toggleClass,
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
        secBtnAction: () => { deleteImage(); closeModal(); },
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
    if (genOption === 1) {
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
        <ListItemText primary={option} style={{ textAlign: 'center' }} />
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
      image, draggable, scaleX, scaleY, modal, toggleClass,
    } = this.state;
    const {
      components,
      handleTransformation,
      openPanel,
      totalComponents,
      collapseColumn,
      rightColumnOpen,
      focusComponent,
    } = this.props;
    const {
      increaseHeight,
      decreaseHeight,
      updateImage,
      toggleDrag,
      main,
      showImageDeleteModal,
      showGenerateAppModal,
      setImage,
      openWorkspace,
      saveWorkspace,
    } = this;

    return (
      <MuiThemeProvider theme={theme}>
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
            toggleClass={toggleClass}
            openWorkspace={openWorkspace}
            saveWorkspace={saveWorkspace}
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
                  focusComponent={focusComponent}
                  setImage={setImage}
                />
              ) : <Info />
            }
          </div>
          {modal}
        </div>
      </MuiThemeProvider>
    );
  }
}

MainContainer.propTypes = {
  components: PropTypes.array.isRequired,
  compProps: PropTypes.array.isRequired,
  handleTransformation: PropTypes.func.isRequired,
  toggleComponetDragging: PropTypes.func.isRequired,
  totalComponents: PropTypes.number.isRequired,
  openPanel: PropTypes.func.isRequired,
  collapseColumn: PropTypes.func.isRequired,
  createApplication: PropTypes.func.isRequired,
  changeImagePath: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired,
  rightColumnOpen: PropTypes.bool.isRequired,
  focusComponent: PropTypes.object.isRequired,
  importWorkspace: PropTypes.func.isRequired,
  exportWorkspace: PropTypes.func.isRequired,
  nextId: PropTypes.number.isRequired,
  nextPropId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
