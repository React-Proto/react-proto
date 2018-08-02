const fs = require('fs');
const componentRender = require('./componentRender.util.js');


function createFiles(data, path, event) {
  data.forEach((component) => {
    fs.writeFile(`${path}/${component.title}.js`, componentRender(component, data), (err) => {
      if (err) {
        event.sender.send('file_notification', 'error');
      } else {
        event.sender.send('file_notification', 'success');
      }
    });
  });
}

module.exports = createFiles;
