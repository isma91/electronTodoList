const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

//we use let to have a global var;
let win
function createWindow() {
  //cannot require screen module before app is ready
  const screen = require('electron').screen;
  var display = screen.getPrimaryDisplay();
  var mainScreen = display.size;
  var screenHeight = mainScreen.height * (3 / 4);
  var screenWidth = mainScreen.width * (3 / 4);
  //Create le browser window.
  win = new BrowserWindow({ width: screenWidth, height: screenHeight })

  // load login.html to display to the window.
  win.loadURL(`file://${__dirname}/src/html/login.html`);

  // DevTools.
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  //console.log(app.getAppPath());
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // Sur macOS condition
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS condition
  if (win === null) {
    createWindow()
  }
})