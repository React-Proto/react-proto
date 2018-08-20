# React-Proto [![Build Status](https://travis-ci.com/CS-Eevee/react-proto.svg?branch=master)](https://travis-ci.com/CS-Eevee/react-proto) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[React-Proto](https://cs-eevee.github.io/react-proto/) is a React application prototyping tool.

It allows you to visualize/setup your application architecture upfront and recreate this architecture as application files either into a previous project or a new create-react-app project or a starter template from any repository.

React-Proto works on macOS, Windows, Linux.
If you find any issues, [file issue](https://github.com/CS-Eevee/react-proto/issues)

## How To Use

- To start a new project, either import an image file for the application you want to build or start with a blank stage.

- Using the input at the top of the left column, input the name of the component you would like to create, then drag it into place and resize accordingly.

- While building, you can use the icons in the toolbar to zomm in and zoom out, toggle the draggability of the stage, update or remove the image, collapse the left container, and eventually export your files.

- For each component you have a series of options: You can define whether your component will have state, the color of the component on the screen, and the ability to apply a parent component.

- If you place a container around other components and can no longer access them, you can use the layer buttons in the corresponding dropdown menu to decrease the z-index. Alternatively, you can increase the z-index of the desired components.

- After you have successfully structured your components, you can use the dropdown menu to apply parent components and visualize the hierarchy of your application structure.

- In the right container, the props tab allows you to define props in key value pairs, as well as the necessary prop type.

- Once you are finished, you can use the export button in the toolbar to choose from three options of how to export your files: 
  1. Import your files into an existing project. Just choose the path where you would like to create your components folder.
  2. Use create-react-app to start a new project (the project will be under the "proto_app").
  3. Clone your favorite Github repo to start a project with your favorite starter files.

- Lastly, start building!

## Authors

[Blessing E Ebowe](https://www.linkedin.com/in/blessingebowe/) [@refinedblessing](https://github.com/refinedblessing)

[Brian Taylor](https://www.linkedin.com/in/brianwtaylor/) [@brianwtaylor](https://github.com/brianwtaylor)

[Erik Guntner](https://www.linkedin.com/in/erik-guntner-9aa324b9/) [@erikguntner](https://github.com/erikguntner)

## Running Your Own Version

Click on the **Fork** button on the top right of the page.

<img src="https://help.github.com/assets/images/help/repository/fork_button.jpg" width="300px"></img>

``` bash
# Install dependencies
npm install

# Run application
npm start

# For development environment...
npm run dev

# on another terminal
npm run electron

# Run Linter
npm run linter
```

## Testing

Run ```npm test``` or ```yarn test``` to run test suite.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/CS-Eevee/react-proto/blob/master/LICENSE.md) file for details.
