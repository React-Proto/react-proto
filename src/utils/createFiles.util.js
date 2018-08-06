const fs = require('fs');
const componentRender = require('./componentRender.util.js');


function createFiles(data, path) {
  const promises = [];
  data.forEach((component) => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(`${path}/${component.title}.js`, componentRender(component, data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    promises.push(newPromise);
  });

  return Promise.all(promises);
}

module.exports = createFiles;
