const fs = require('fs');
const componentRender = require('./componentRender.util.js');

function createFiles(data, path) {
  data.forEach((component) => {
    fs.writeFileSync(`${path}/${component.title}.js`, componentRender(component, data), (err) => {
      if (err) {
        console.log('there was an error writing the file', err);
      } else {
        console.log('writing file suceeded');
      }
    });
  });
}

module.exports = createFiles;
