const componentRender = (component, compProps) => {
  const {
    children,
    title,
    stateful,
    router, routes,
  } = component;

  console.log(compProps);
  const thisState = compProps.filter(el => el.origin === component.id);
  const thisProps = compProps.filter(el => el.displayedAt.includes(component.id));


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
        this.state = {${thisState.map(state => `this.${state.key}: ${state.value}, \n`)}};
      }`
    : ''
}

      render() {
        const {
          ${thisProps.map(prop => `${prop.key} \n`)}
        } = this.props;
        const {
          ${thisState.map(prop => `${prop.key}\n`)}
        } = this.state;

        return (
          ${router ? '<Router><div>' : '<div>'}
          ${
  stateful
    ? children
      .map(
        child => `<${child.title} ${compProps
          .filter(prop => prop.displayedAt.includes(child.id))
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
        route => `<Route path='${route.path}' component={${
          route.routeCompTitle
        }}/>`,
      )
      .join('\n')
    : ''
}
          ${router ? '</div></Router>' : '</div>'}
          )
        }
      }

      ${title}.propTypes = {
        ${thisProps
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
      ${thisProps.length > 0
    ? `const {
          ${thisProps.map(prop => `${prop.key} \n`)}
        } = this.props;` : ''
}
      return <div>
        ${children
    .map(
      child => `<${child.title} ${compProps
        .filter(prop => prop.displayedAt.includes(child.id))
        .map(prop => `${prop.key}={${prop.value}}`)
        .join(' ')}/>`,
    )
    .join('\n')
}
      </div>
    );

    ${title}.propTypes = {
      ${thisProps
    .map(
      p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`,
    )
    .join('\n')}
    }

    export default ${title};
  `;
};

export default componentRender;
