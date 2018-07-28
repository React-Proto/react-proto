const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog,
  ipcMain,
} = require('electron');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');
const fs = require('fs');
const createFiles = require('./src/utils/createFiles.util.js');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const isDev = process.env.NODE_ENV === 'development';

// Open image file
function openFile() {
  // Opens file dialog looking for markdown
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{
      name: 'Images', extensions: ['jpeg', 'jpg', 'png', 'gif', 'pdf'],
    }],
  });

  // if no files
  if (!files) return;
  const file = files[0];

  // Send fileContent to renderer
  mainWindow.webContents.send('new-file', file);
}


// Choose directory and export files
ipcMain.on('export-files', (event, data) => {
  const directory = dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });

  // if no directory
  if (!directory) return;
  const dir = directory[0];
  const path = `${dir}/components`;

  if (fs.existsSync(path)) {
    createFiles(data, path);
  } else {
    fs.mkdir(path, (err) => {
      if (err) return console.error(err);
      createFiles(data, path);
    });
  }
});

// Update file
ipcMain.on('update-file', (event) => {
  openFile();
});

const createWindow = () => {
  // Create the browser window.
  // eslint-disable-next-line
  const { width, height } = require('electron').screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
    width,
    height,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);

  const template = [{
    label: 'File',
    submenu: [{
      label: 'Open File',
      accelerator: 'CmdOrCtrl+O',
      click() {
        openFile();
      },
    }],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ],
  },
  {
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click() {
        shell.openExternal('https://electronjs.org');
      },
    }],
  },
  {
    label: 'Developer',
    submenu: [{
      label: 'Toggle Developer Tools',
      accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
      click() {
        mainWindow.webContents.toggleDevTools();
      },
    }],
  },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });

    // Edit menu
    template[2].submenu.push({
      type: 'separator',
    }, {
      label: 'Speech',
      submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
    });

    // Window menu
    template[4].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (isDev) {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => {
        console.log(`Added Extension:  ${name}`);
        createWindow();
      })
      .catch(err => console.log('An error occurred: ', err));
  } else {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
