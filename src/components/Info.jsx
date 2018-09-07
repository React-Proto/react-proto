import React from "react";

const command = window.navigator.platform.match(/^mac/) ? 'Cmd+O' : 'Ctrl+Shift+O';

const Info = () => (
  <div className="info">
    <h1>Press {command} to upload an image</h1>
  </div>
);

export default Info;
