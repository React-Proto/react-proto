import util from 'util';

const execFile = util.promisify(require('child_process').execFile);

async function createApplicationUtil({ path, appName }) {
  return [
    await execFile('npm', ['i', '-g', 'create-react-app']),
    await execFile('create-react-app', [appName], { cwd: path }),
  ];
}

export default createApplicationUtil;
