import util from 'util';

const execFile = util.promisify(require('child_process').execFile);

// Application generation options
// cosnt genOptions = [
//   'Export into existing project.', 'Export with create-react-app.', 'Export with starter repo'
// ];

async function createApplicationUtil({
  path, appName, genOption, repoUrl,
}) {
  if (genOption === 2) {
    return repoUrl ? execFile('git', ['clone', repoUrl, appName], { cwd: path }) : null;
  }
  return [
    await execFile('npm', ['i', '-g', 'create-react-app']),
    await execFile('create-react-app', [appName], { cwd: path }),
  ];
}

export default createApplicationUtil;
