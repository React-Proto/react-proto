const componentRender = (name, state) => {
  if (state) {
    return `import React, { Component } from 'react';

  export default class ${name} extends Component {
    render() {
      return (
        <div>
          ${name}
        </div>
      )
    }
  }`;
  }

  return `import React from 'react';
    
  export default ${name} = () => {
    return (
      <div>
        ${name}
      </div>
    )
  }`;
};


module.exports = componentRender;
