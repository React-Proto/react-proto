import React from 'react';
// import '../../setupTests';
import { shallow } from 'enzyme';
import App from '../App.jsx';
import AppContainer from '../../containers/AppContainer.jsx';

it('contains a AppContainer', () => {
  // wrapped version of react component
  // component comes with additional functionality
  const wrapped = shallow(<App />);
  // look inside wrapped component and find every instance of commentBox inside of it
  expect(wrapped.find(AppContainer).length).toEqual(1);
});
