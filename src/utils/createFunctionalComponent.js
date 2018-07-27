const createFunctionalComponent = name => `import React from 'react';

export default ${name} = () => {
  return (
    <div>
      ${name}
    </div>
  )
}`;

module.exports = createFunctionalComponent;
