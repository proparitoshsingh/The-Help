const { app, BrowserWindow, ipcMain } = require('electron');
const electronReload = require('electron-reload');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

electronReload(__dirname, {
   electron: require(`${__dirname}/node_modules/electron`),
   mainProcessFile: "main.js",
});

function createWindow(){
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false
      }
   });

   win.loadFile('public/index.html')
}

app.whenReady().then(() => {
   createWindow();

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
   })
})

app.on('window-all-closed', () => {
   app.quit()
})

ipcMain.on('analyzeVid', async (event, filePath) => {
   const pythonScriptPath = path.join(__dirname, '../PyScript/script.py');
   const pythonProcess = spawn('python', [pythonScriptPath, filePath]);
   let res='';
   pythonProcess.stdout.on('data', (data) => {
      res+=data.toString();
   });

   pythonProcess.stderr.on('data', (data) => {
      console.log(data.toString());
   });

   pythonProcess.on('exit', async () => {
      const imagePath = path.join(__dirname, 'emotion_plot.png');
      if (fs.existsSync(imagePath)) {
         event.reply('imageRes', imagePath);
      } else {
         console.error("Image file not found.");
      }
   });
});