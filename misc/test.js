const fs = require('fs');
const path = require('path');

const folderPath = './deck';

// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error('Error al leer la carpeta:', err);
//     return;
//   }

//   files.forEach((file) => {
//     const filePath = `./deck/${file}`
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error(`Error al eliminar el archivo ${file}:`, err);
//       }
//     });
//   });
// });
