const { ipcRenderer } = require('electron');

const btn = document.getElementById('analyzeVid');
btn.addEventListener('click', () => {
   console.log('button clicked for analyze');
   const fileEle = document.getElementById('fileInput');
   const filePath = fileEle.files[0].path;
   ipcRenderer.send('analyzeVid', filePath);
   window.location.href = 'result.html';
});
