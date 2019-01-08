import path from 'path';
import fs from 'fs';
import yauzl from 'yauzl-promise';
import getAppDataPath from './getAppDataPath.util';
import convertIdsToObjs from './convertIdsToObjs.util';

/**
 *  Summary: opens a rproto file and de-serializes the stored metadata into a workspaceData Object.
 *  @param  {string} workspaceFilePath - Path to React-Proto Workspace rproto file
 *  @return {object} Object containing metadata for a saved React-Proto Worksapce
 */

const readWorkspaceFile = async (workspaceFilePath) => {
  // Create name for JSON meta file
  const metaJSONFile = path.basename(workspaceFilePath.replace(/.rproto$/i, '.json'));
  // Determine where metadata & image file should be saved
  const appDataPath = path.join(getAppDataPath('react-proto'), 'temp');
  let workspaceData = null;

  // helper function for processing a zip entry
  const processEntry = async (entry) => {
    const { fileName } = entry; // Refer to https://www.npmjs.com/package/yauzl#class-entry
    const unzippedFile = fs.createWriteStream(path.join(appDataPath, fileName), { flags: 'w', autoClose: true });
    const readStream = await entry.openReadStream();
    readStream.pipe(unzippedFile);
  };

  // Ensure Target directory for extraction exists
  try {
    fs.accessSync(appDataPath, fs.constants.W_OK);
  } catch (existsError) {
    try {
      fs.mkdirSync(appDataPath, { recursive: true });
    } catch (mkdirError) {
      throw new Error(`Unable to extract Workspace file to application data folder. ${mkdirError.message}`);
    }
  }

  // Uncompress & extract the workspace metadata and image
  const rprotoInput = await yauzl.open(workspaceFilePath);
  await rprotoInput.walkEntries(async (entry) => {
    await processEntry(entry);
  });
  await rprotoInput.close();

  // De-serialize workspaceData Object from JSON formatted string
  const data = fs.readFileSync(path.join(appDataPath, metaJSONFile), 'utf8');
  try {
    workspaceData = JSON.parse(data);
  } catch (parseError) {
    console.error(data);
    throw new Error(`Unable to parse Workspace meta data. ${parseError}`);
  }

  // Adjust workspaceData Object for Application Use
  if (workspaceData.imagePath) {
    // Adjust imagePath to where it will be extracted
    workspaceData.imagePath = path.join(appDataPath, workspaceData.imagePath);
  }
  workspaceData = { ...workspaceData, components: convertIdsToObjs(workspaceData.components) };
  if (workspaceData.focusComponent) {
    workspaceData.focusComponent = workspaceData
      .components.find(component => component.id === workspaceData.focusComponent.id);
  }
  return workspaceData;
};

export default readWorkspaceFile;
