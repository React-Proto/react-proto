const componentRender = (component) => {
  console.log(component);
  const {
    children, title, props, stateful,
    // router, routes,
  } = component;

  // temp
  const router = true;
  const routes = [
    {
      path: '/location',
      componentName: 'place',
      name: 'location',
    },
    {
      path: '/otherlocation',
      componentName: 'otherplace',
      name: 'otherlocation',
    },
  ];

  if (stateful || router) {
    return `
      import React, { Component } from 'react';
      ${
  router
    ? "import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'"
    : ''
}
      import PropTypes from 'prop-types';
      ${
  stateful
    ? children
      .map(child => `import ${child.title} from './${child.title}.jsx'`)
      .join('\n')
    : ''
}

      class ${title} extends Component {
      ${
  stateful
    ? `constructor(props) {
        super(props);
        this.state = {};
      }`
    : ''
}

      render() {
        const { ${props.map(p => `${p.key}`).join(', ')} } = this.props;
        
        return (
          ${router ? '<Router><div>' : '<div>'}
          ${
  stateful && !router
    ? children
      .map(
        child => `<${child.title} ${child.props
          .map(prop => `${prop.key}={${prop.value}}`)
          .join(' ')}/>`,
      )
      .join('\n')
    : ''
}
          ${
  router
    ? routes
      .map(
        route => `<Route path=${route.path} component={${
          route.componentName
        }}>${route.name}</Route>`,
      )
      .join('\n')
    : ''
}
          ${router ? '</div></Router>' : '</div>'}
          )
        }
      }

      ${title}.propTypes = {
        ${props
    .map(
      p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`,
    )
    .join('\n')}
      }

      export default ${title};
    `;
  }

  return `
    import React from 'react';
    import PropTypes from 'prop-types';
    ${children
    .map(child => `import ${child.title} from './${child.title}.jsx'`)
    .join('\n')}

    const ${title} = props => (
      <div>
        ${children
    .map(
      child => `<${child.title} ${child.props
        .map(prop => `${prop.key}={${prop.value}}`)
        .join(' ')}/>`,
    )
    .join('\n')}
      </div>
    );

    ${title}.propTypes = {
      ${props
    .map(
      p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`,
    )
    .join('\n')}
    }

    export default ${title};
  `;
};

export default componentRender;
