const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.

  win = new BrowserWindow({
      title: "Align",
      width: 210,
      height: 400,
      frame: false,
      icon: path.join(__dirname, 'assets/icon64.png'),
      resizable: false,
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null;
app.on('ready', () => {
  createWindow();

  // const nativeImage = NativeImage;

  const iconPath = path.join(__dirname, 'assets/icon22.png');
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Re-Calibrate', type: 'normal', click: () => {
      win.webContents.executeJavaScript(
      "document.getElementById('calibrateBtn').click()")
    }},
    {label: '', type: 'separator'},
    {label: 'Quit', type: 'normal', click: () => {app.quit()}},
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu)

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})


minimizeApp = () => {
    win.minimize();
};


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
