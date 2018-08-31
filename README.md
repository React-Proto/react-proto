# React-Proto [![Build Status](https://travis-ci.com/React-Proto/react-proto.svg?branch=master)](https://travis-ci.com/React-Proto/react-proto) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 

<img src="https://github.com/React-Proto/react-proto/blob/master/src/public/icons/png/64x64.png"/>
 
[React-Proto](https://react-proto.github.io/react-proto/) is a React application prototyping tool for developers and designers.

React-Proto allows the user to visualize/setup their application architecture upfront and eject this architecture as application files either into a previous project or a new create-react-app project or a starter template from any repository.

Download for [MacOS](https://github.com/React-Proto/react-proto/releases/download/v1.0.0/React-Proto-1.0.0.dmg), [Windows](https://github.com/React-Proto/react-proto/releases/download/v1.0.0/React-Proto.Web.Setup.1.0.0.exe), [Linux](https://github.com/React-Proto/react-proto/releases/download/v1.0.0/react-proto_1.0.0_amd64.deb).
* Mac users only: for now you might need to go to your security settings to allow the app run on your system as we do not have an Apple license yet.

If you find any issues, [file issue](https://github.com/React-Proto/react-proto/issues)

## How To Use

- Application can be run from cli  using ```react-proto``` command or by clicking on the application icon.

- To start a new project, either import a mockup or start with a blank stage.

- Add components you would like to create using the input, then drag the component frame into place and resize accordingly.

<img src="https://github.com/React-Proto/react-proto/blob/master/assets/dragging.gif"/>

- While building, you can use the icons in the toolbar to zoom, toggle draggability of the stage, update or remove an image, collapse the left container, and export your files.

- For each component you have the ability to define whether your component will have state, the color of the frame component, and the ability to apply a parent component.

- If you place a container around other components and can no longer access them, you can use the layer buttons in the corresponding dropdown menu to change layer order down or up.

<img src="https://github.com/React-Proto/react-proto/blob/master/assets/hierarchy.gif"/>

- In the right container, the props tab allows you to define props in key value pairs, as well as the necessary prop type.

- Once you are finished, you can use the export button in the toolbar to choose from three options of how to export your files: 
  1. Import your files into an existing project. Just choose the path where you would like to create your components folder.
  2. Use create-react-app to start a new project (the project will be under the "proto_app").
  3. Clone your favorite Github repo to start a project with your favorite starter files.

<img src="https://github.com/React-Proto/react-proto/blob/master/assets/export.gif"/>

- Lastly, start building!

## Authors

[Blessing E Ebowe](https://www.linkedin.com/in/blessingebowe/) [@refinedblessing](https://github.com/refinedblessing)

[Brian Taylor](https://www.linkedin.com/in/brianwtaylor/) [@brianwtaylor](https://github.com/brianwtaylor)

[Erik Guntner](https://www.linkedin.com/in/erik-guntner-9aa324b9/) [@erikguntner](https://github.com/erikguntner)

## Running Your Own Version

- **Fork** and **Clone** Repository.

- Open project directory

``` bash
cd react-proto
```

- Install dependencies

``` bash
yarn install
```

- Run application

``` bash
yarn start
```

- For development experience...

``` bash
yarn dev
```

- and on another terminal

``` bash
yarn electron
```

## Linting

``` bash
yarn linter
```

## Testing

```bash
yarn test
```

## Built With

- [React](https://reactjs.org/) - Framework for building user interaces.
- [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps.
- [Electron](https://electronjs.org/) - Cross-platform desktop apps with HTML, CSS and JS.
- [KonvaJS](https://konvajs.github.io/) - HTML5 2d canvas library for desktop and mobile applications.
- [React-Sortable-Tree](https://github.com/frontend-collective/react-sortable-tree#options) - Drag-and-drop sortable component for nested data and hierarchies.

## Acknowledgments

### Logo Design

[Clariz Mariano](www.clarizmariano.com) [@havengoer](https://github.com/havengoer)

[Joe Thel](https://www.linkedin.com/in/joe-thel/) [@fakemonster](https://github.com/fakemonster)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/React-Proto/react-proto/blob/master/LICENSE.md) file for details.
