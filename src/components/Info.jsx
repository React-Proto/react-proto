import React from "react";

let command;

window.navigator.platform.match(/^mac/) ? command = 'Cmd+O' : command = 'Ctrl+Shift+O';

const Info = () => (
  <div className="info">
    <h1>Press {command} to upload an image</h1>
  </div>
);

export default Info;
