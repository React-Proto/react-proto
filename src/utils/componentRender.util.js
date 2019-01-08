const componentRender = (component, compProps) => {
  const {
    children, title, stateful, router, routes,
  } = component;

  const thisState = compProps.filter(el => el.origin === component.id);
  const thisProps = compProps.filter(el => el.displayedAt.includes(component.id));

  if (stateful || router) {
    return `
      import React, { Component } from 'react';
      ${
  router
    ? "import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';"
    : ''
}
      import PropTypes from 'prop-types';

      ${children.map(child => `import ${child.title} from './${child.title}.jsx'`).join('\n')}

  class ${title} extends Component {
      ${
  stateful

    ? `  constructor(props) {
           super(props);
           this.state = {
             /* define your state here */
             ${thisState.map(state => ` ${state.key}: null`)}
           }; 
         }`
    : ''
}

        render() {
          const {
            /* deconstruct this.props here */
            ${thisProps.map(prop => ` ${prop.key}`).join(',\n')}
          } = this.props;


          const {
            /* deconstruct this.state here */
            ${thisState.map(prop => ` ${prop.key}`).join(',\n')}
          } = this.state;

          return (
            ${router ? '<Router><div>' : '<div>'}
            ${
  stateful
    ? children
      .map(child => `  <${child.title} ${compProps
        .filter(prop => prop.displayedAt.includes(child.id))
        .map(prop => `${prop.key}={${prop.key}}`)
        .join(' ')}/>`)
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
    : ''
}
            ${router ? '</div></Router>' : '</div>'}
          );
        }
      }

      ${title}.propTypes = {
        ${thisProps
    .map(
      p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`,
    )
    .join('\n')}
      };

      export default ${title};
    `;
  }

  return `
    import React from 'react';
    import PropTypes from 'prop-types';
    ${children
    .map(child => `import ${child.title} from './${child.title}.jsx'`)
    .join('\n')}

    const ${title} = props => {
      ${thisProps.length > 0
    ? `const {
         /* deconstruct props here */
         ${thisProps.map(prop => ` ${prop.key}`)}
        } = props;` : ''
}
      return (
        <div>
        ${children
    .map(child => `  <${child.title} ${compProps
      .filter(prop => prop.displayedAt.includes(child.id))
      .map(prop => `${prop.key}={${prop.key}}`)
      .join(' ')}/>`)
    .join('\n')}
        </div>
      );
    };

    ${title}.propTypes = {
      ${thisProps
    .map(p => `  ${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''}`)
    .join(',\n\t')}};

    export default ${title}; \n`;
};

export default componentRender;
