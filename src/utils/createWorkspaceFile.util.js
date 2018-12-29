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

    // Create a meta file representing our state
    // Serialize workspaceData Object to JSON

    // where to pipe to
    const transformStream = JSONStream.stringifyObject('{\n', '\n,\n', '\n}\n');
    const outputStream = fs.createWriteStream(metaJSONFile);
    transformStream.pipe(outputStream);

    // start writing to the pipe
    const workspaceDataKeys = Object.keys(workspaceData);
    for (let i = 0; i < workspaceDataKeys.length; i += 1) {
      // Filtering out properties
      // console.log(workspaceDataKeys[i]);
      // console.log(workspaceData[workspaceDataKeys[i]]);
      if (workspaceDataKeys[i] === 'imagePath') transformStream.write([workspaceDataKeys[i], path.basename(workspaceData[workspaceDataKeys[i]])]);
      else if (workspaceDataKeys[i] !== 'workspaceFilePath') transformStream.write([workspaceDataKeys[i], workspaceData[workspaceDataKeys[i]]]);
    }

    // close the pipe
    transformStream.end();

    // Zip the image & meta file together
    // Create a file to stream archive data to
    outputStream.on('finish', () => {
      const rprotoOutput = fs.createWriteStream(workspaceData.workspaceFilePath);
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
          resolve(workspaceData.workspaceFilePath);
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
      if (workspaceData.imagePath) {
        archive.append(
          fs.createReadStream(workspaceData.imagePath),
          { name: path.basename(workspaceData.imagePath), comment: 'React-Proto image' },
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
