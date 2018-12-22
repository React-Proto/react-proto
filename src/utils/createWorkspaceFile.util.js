/*
 *  createWorkspaceFile:  Create meta file in JSON format.
 *                        Create a zip file that contains the main container
 *                        image plus the meta file. On success returns workspace
 *                        file path.
 */
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const createWorkspaceFile = (workspaceData) => {
  const replacer = (key, value) => {
    // Filtering out properties
    if (key === 'workspaceFilePath') return undefined;
    if (key === 'imagePath') return path.basename(value);
    return value;
  };

  const newPromise = new Promise((resolve, reject) => {
    // Create a meta file representing our state
    // Serialize workspaceData Object to JSON
    const serialize = JSON.stringify(workspaceData, replacer, 2);

    // Create name for JSON meta file
    const metaJSONFile = workspaceData.workspaceFilePath.replace(/.rproto$/i, '.json');

    // Write serialized workspaceData to file
    fs.writeFile(
      metaJSONFile,
      serialize,
      { flag: 'w' },
      (err) => {
        if (err) reject(err);
        // Zip the image & meta file together
        // Create a file to stream archive data to
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
            { name: path.basename(workspaceData.imagePath) },
          );
        }

        archive
          .append(
            fs.createReadStream(metaJSONFile),
            { name: path.basename(metaJSONFile) },
          )
          .finalize();
      },
    );
  });
  return newPromise;
};

export default createWorkspaceFile;
