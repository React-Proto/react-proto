const componentRender = (component, components) => {
  const { state, children, title } = component;

  if (state) {
    return `
import React, { Component } from 'react';
${children ? children.map(index => `import ${components[index].title} from './${components[index].title}.js'`).join('\n') : ''}


export default class ${title} extends Component {
render() {
  return (
    <div>
      ${children ? children.map((index, i) => {
    if (i === 0) {
      return `<${components[index].title} />`;
    }
    return `      <${components[index].title} />`;
  }).join('\n') : title}  
    </div>
  )
  }
}`;
  }

  return `
import React from 'react';
${children ? children.map(index => `import ${components[index].title} from './${components[index].title}.js'/n`).join('') : ''}
  
export default ${title} = props => {
  return (
    <div>
    ${children ? children.map((index, i) => {
    if (i === 0) {
      return `<${components[index].title} />`;
    }
    return `      <${components[index].title} />`;
  }).join('\n') : title}  
    </div>
  )
}`;
};

module.exports = componentRender;
