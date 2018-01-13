const { app, BrowserWindow } = require('electron');
const path = require('path'), { sep } = path;

const DEVELOPMENT_MODE = true;

// DevTools
const { 
    default: installExtension, 
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS 
} = require('electron-devtools-installer');

// Loads from File in production build
let mainUrl = `file://${__dirname + sep}build${sep}index.html`;

// Loads the Development URL during dev
if(DEVELOPMENT_MODE)
    mainUrl = `http://localhost:3000/`;

let winOpts = {
    width: 800,
    height: 600,
    show: false,
};

let mWin;

app.on('ready', ()=>
{
    if(DEVELOPMENT_MODE)
        addDevTools();
    
    createWin();
});

app.on('window-all-closed', ()=>
{
    app.quit();
});

function createWin()
{
    mWin = new BrowserWindow(winOpts);
    mWin.loadURL(mainUrl);

    mWin.webContents.openDevTools();

    mWin.on('ready-to-show', ()=>
    {
        mWin.show();
    });

    mWin.on('closed', ()=>
    {
        //mWin = null;
    })
}

function addDevTools()
{
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
}