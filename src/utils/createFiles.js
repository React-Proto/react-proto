const fs = require('fs');
const createClassComponent = require('./createClassComponent');
const createFunctionalComponent = require('./createFunctionalComponent');


function createFiles(data, path) {
  data.forEach((file) => {
    if (file.state) {
      fs.writeFileSync(`${path}/${file.name}.js`, createClassComponent(file.name), (err) => {
        if (err) {
          console.log('there was an error writing the file', err);
        } else {
          console.log('writing file suceeded');
        }
      });
    } else {
      fs.writeFileSync(`${path}/${file.name}.js`, createFunctionalComponent(file.name), (err) => {
        if (err) {
          console.log('there was an error writing the file', err);
        } else {
          console.log('writing file suceeded');
        }
      });
    }
  });
}

module.exports = createFiles;
