import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.util';

const createFiles = (data) => {
  const { components, compProps, path } = data;

  let dir = path;
  if (!dir.match(/components|\*$/)) {
    if (fs.existsSync(`${dir}/src`)) {
      dir = `${dir}/src`;
    }
    dir = `${dir}/components`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  const promises = [];
  components.forEach((component) => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(`${dir}/${component.title}.jsx`,
        componentRender(component, compProps),
        // , {
        //   singleQuote: true,
        //   trailingComma: 'es5',
        //   bracketSpacing: true,
        //   jsxBracketSameLine: true,
        //   parser: 'babylon',
        // }),
        (err) => {
          if (err) return reject(err.message);
          return resolve(path);
        });
    });

    promises.push(newPromise);
  });

  return Promise.all(promises);
};

export default createFiles;
