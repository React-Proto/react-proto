import path from 'path';
import { platform, homedir } from 'os';

/**
 * Helper functions for determining the Application Data Path.
 */
const getForWindows = () => path(homedir(), 'AppData', 'Roaming');

const getForMac = () => path(homedir(), 'Library', 'Application Support');

const getForLinux = () => path(homedir(), '.config');

const getFallback = () => {
  if (platform().startsWith('win')) {
    // Who knows, maybe its win64?
    return getForWindows();
  }
  return getForLinux();
};

const getAppDataPath = (app) => {
  let appDataPath = process.env.APPDATA;

  if (appDataPath === undefined) {
    switch (platform()) {
      case 'win32':
        appDataPath = getForWindows();
        break;
      case 'darwin':
        appDataPath = getForMac();
        break;
      case 'linux':
        appDataPath = getForLinux();
        break;
      default:
        appDataPath = getFallback();
    }
  }

  if (app === undefined) {
    return appDataPath;
  }

  const normalizedAppName = appDataPath !== homedir() ? app : `.${app}`;
  return path(appDataPath, normalizedAppName);
};

export default getAppDataPath;
