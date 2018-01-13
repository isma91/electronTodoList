const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

//we use let to have a global var;
let win

function createWindow () {
  //cannot require screen module before app is ready
  const screen = require('electron').screen;
  var display = screen.getPrimaryDisplay();
  var mainScreen = display.size;
  var screenHeight = mainScreen.height / 2;
  var screenWidth = mainScreen.width / 2;
  // Créer le browser window.
  win = new BrowserWindow({width: screenWidth, height: screenHeight})

  // load index.html to display to the window.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // DevTools.
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
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