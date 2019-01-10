import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RouteDisplay from '../RouteDisplay.jsx';

describe('React unit tests', () => {
  describe('RouteDisplay', () => {
    let wrapper;
    const handleDeleteRoute = jest.fn();
    const classes = {};

    const props = {
      componentTitle: 'TestComp',
      pathName: 'TestPath',
      routeCompId: '2',
      handleDeleteRoute,
      classes,
      routerCompId: '1',
    };

    beforeAll(() => {
      wrapper = mount(<RouteDisplay {...props} />);
    });

    it('snapshot test', () => {
      const tree = renderer.create(<RouteDisplay {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should show the path name and comp name, with one line break', () => {
      expect(wrapper.text()).toEqual('Path: / TestPathComponent: TestComp');
      expect(wrapper.find('br')).toHaveLength(1);
    });

    it('clicks delete handler when button clicked', () => {
      wrapper.find('button').simulate('click');
      expect(handleDeleteRoute.mock.calls.length).toEqual(1);
    });
  });
});
