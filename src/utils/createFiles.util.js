const fs = require('fs');
const componentRender = require('./componentRender.util.js');

function createFiles(data, path) {
  data.forEach((file) => {
    fs.writeFileSync(`${path}/${file.name}.js`, componentRender(file.name, file.state), (err) => {
      if (err) {
        console.log('there was an error writing the file', err);
      } else {
        console.log('writing file suceeded');
      }
    });
  });
}

module.exports = createFiles;
