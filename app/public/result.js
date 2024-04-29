const { ipcRenderer } = require('electron');

ipcRenderer.on('imageRes', (event, imagePath) => {
   console.log("updating src");
   const resBtn = document.getElementById('res');
   resBtn.innerHTML = "Result:";
   const imgElement = document.getElementById('resImg');
   imgElement.src = imagePath;
   imgElement.style.display='inline';
});
function backHome() {
   window.location.href = "index.html";
};
