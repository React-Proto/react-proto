/*
 *  createWorkspaceFile:  Create meta file in JSON format.
 *                        Create a zip file that contains the main container
 *                        image plus the meta file. On success returns workspace
 *                        file path.
 */
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import JSONStream from 'JSONStream';

const createWorkspaceFile = (workspaceData) => {
  const newPromise = new Promise((resolve, reject) => {
    // Create name for JSON meta file
    const metaJSONFile = workspaceData.workspaceFilePath.replace(/.rproto$/i, '.json');

    // Filter Object ref properties to remove serialization issues
    const { focusComponent, components } = workspaceData;
    let slimComponents = [];
    let slimFocusComponent = {};
    if (focusComponent) {
      slimFocusComponent = { ...focusComponent, parent: {}, children: [] };
    }
    if (components) {
      slimComponents = components.map(component => (
        { ...component, parent: {}, children: [] }
      ));
    }
    const slimWorkspaceData = {
      ...workspaceData,
      components: slimComponents,
      focusComponent: slimFocusComponent,
    };

    // Create a meta file representing our state
    // Serialize workspaceData Object to JSON

    // where to pipe to
    const transformStream = JSONStream.stringifyObject('{\n', ',\n', '\n}\n');
    const outputStream = fs.createWriteStream(metaJSONFile);
    transformStream.pipe(outputStream);

    // start writing to the pipe
    const workspaceDataKeys = Object.keys(slimWorkspaceData);
    for (let i = 0; i < workspaceDataKeys.length; i += 1) {
      if (workspaceDataKeys[i] === 'imagePath') {
        transformStream.write(
          [
            workspaceDataKeys[i],
            path.basename(slimWorkspaceData[workspaceDataKeys[i]]),
          ],
        );
      } else if (workspaceDataKeys[i] !== 'workspaceFilePath') {
        transformStream.write(
          [
            workspaceDataKeys[i],
            slimWorkspaceData[workspaceDataKeys[i]],
          ],
        );
      }
    }

    // close the pipe
    transformStream.end();

    // Zip the image & meta file together
    // Create a file to stream archive data to
    outputStream.on('finish', () => {
      const rprotoOutput = fs.createWriteStream(slimWorkspaceData.workspaceFilePath);
      const archive = archiver(
        'zip',
        {
          comment: 'React-Proto Workspace archive',
          zlib: { level: 9 }, // Maximum compression level
        },
      );

      // archiver has been finalized and the output file
      // descriptor has closed.
      rprotoOutput.on('close', () => {
        // Clean-up by deleting .json file
        fs.unlink(metaJSONFile, (unlinkErr) => {
          if (unlinkErr) reject(unlinkErr);
          resolve(slimWorkspaceData.workspaceFilePath);
        });
      });

      // good practice to catch warnings
      archive.on('warning', (archiveErr) => {
        // throw error
        reject(archiveErr);
      });

      // good practice to catch this error explicitly
      archive.on('error', (archiveErr) => {
        reject(archiveErr);
      });

      // pipe archive data to the file
      archive.pipe(rprotoOutput);

      // Append finalize the archive
      // we are done appending files but streams have to finish yet
      if (slimWorkspaceData.imagePath) {
        archive.append(
          fs.createReadStream(slimWorkspaceData.imagePath),
          { name: path.basename(slimWorkspaceData.imagePath), comment: 'React-Proto image' },
        );
      }

      archive
        .append(
          fs.createReadStream(metaJSONFile),
          { name: path.basename(metaJSONFile), comment: 'React-Proto metadata, JSON format' },
        )
        .finalize();
    });
  });
  return newPromise;
};

export default createWorkspaceFile;
