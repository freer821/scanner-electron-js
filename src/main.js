const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const singleAppInstance = app.requestSingleInstanceLock();
if (!singleAppInstance) {
  app.quit();
}

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // eslint-disable-next-line no-undef
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDevelopment) {
    window.webContents.openDevTools({ mode: 'undocked' });
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  mainWindow = createMainWindow();

  app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
      mainWindow = createMainWindow();
    }
  });
});
