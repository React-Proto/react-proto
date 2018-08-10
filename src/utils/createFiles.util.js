import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.util';

const createFiles = (data, path) => {
  let dir = path;
  if (!dir.match(/components|\*$/)) {
    dir = `${dir}/components`;
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, (err) => {
        if (err) console.error(err);
      });
    }
  }
  const promises = [];
  data.forEach((component) => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(`${dir}/${component.title}.jsx`, format(componentRender(component, data)), (err) => {
        return err ? reject(err) : resolve(path);
      });
    });

    promises.push(newPromise);
  });

  return Promise.all(promises);
};

export default createFiles;
