const createClassComponent = name => `import React, { Component } from 'react';

export default class ${name} extends Component {
  render() {
    return (
      <div>
        ${name}
      </div>
    )
  }
}`;

module.exports = createClassComponent;
