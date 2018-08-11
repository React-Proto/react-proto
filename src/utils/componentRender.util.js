const componentRender = (component) => {
  const { stateful, children, title } = component;

  if (stateful) {
    return `
import React, { Component } from 'react';
${children ? children.map(child => `import ${child.title} from './${child.title}.jsx'`).join('\n') : ''}

class ${title} extends Component {
render() {
  return (
    <div>
      ${children ? children.map((child, i) => {
    if (i === 0) {
      return `<${child.title} />`;
    }
    return `      <${child.title} />`;
  }).join('\n') : title}  
    </div>
  )
  }
}

export default ${title}

`;
  }

  return `
import React from 'react';
${children ? children.map(child => `import ${child.title} from './${child.title}.jsx'`).join('\n') : ''}
  
const ${title} = props => {
  return (
    <div>
    ${children ? children.map((child, i) => {
    if (i === 0) {
      return `<${child.title} />`;
    }
    return `      <${child.title} />`;
  }).join('\n') : title}  
    </div>
  )
}

export default ${title}

`;
};

export default componentRender;
