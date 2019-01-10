import React, { Component, Children } from 'react';
import renderer from 'react-test-renderer';
import TextField from '@material-ui/core/TextField';
import { shallow, mount } from 'enzyme';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ConnectedRoutesContainer, { RoutesContainer } from '../RoutesContainer.jsx';
import { styles } from '../LeftComponentContainer.jsx';
import RouteDisplay from '../../components/RouteDisplay.jsx';

describe('Routes Container Tests', () => {
  let wrapper;
  const addRoute = jest.fn();

  const props = {
    classes: {},
    addRoute,
    deleteRoute: () => null,
    setSelectableRoutes: () => null,
    setVisible: () => null,
    component: {
      id: '3',
      selectableRoutes: [
        {
          id: '1',
          title: 'route1',
        },
        {
          id: '2',
          title: 'route2',
        },
      ],
      routes: [
        {
          routeCompId: '3',
          title: 'route3',
        },
        {
          routeCompId: '4',
          title: 'route4',
        },
      ],
    },
  };

  beforeAll(() => {
    wrapper = mount(<RoutesContainer {...props} />);
  });

  it('snapshot test', () => {
    const tree = renderer.create(<RoutesContainer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain an input field that calls handleUpdate when changed', () => {
    const inputField = wrapper.find(TextField);
    expect(inputField).toHaveLength(1);
    const instance = wrapper.instance();

    expect(inputField.prop('onChange')).toBeDefined();
    expect(inputField.prop('onChange')).toBeInstanceOf(Function);
    expect(inputField.prop('onChange')).toEqual(instance.handleChange);
  });

  it('should have a handleUpdate function which sets the state to the current string', () => {
    expect(wrapper.state().pathName).toBe('');
    wrapper.find(TextField).prop('onChange')({ target: { value: 'a' }, preventDefault: () => null });
    expect(wrapper.state().pathName).toBe('a');
  });

  it('should contain two RoutesContainer MUI components', () => {
    expect(wrapper.find(RouteDisplay)).toHaveLength(2);
  });

  it('should contain three route child options', () => {
    const optionslist = wrapper.find('option');
    expect(optionslist).toHaveLength(3);
    expect(optionslist.at(0).text()).toBe('None');
    expect(optionslist.at(1).text()).toBe('route1');
    expect(optionslist.at(2).text()).toBe('route2');
  });

  it('should set the selectedRouteId in state when routeChild is selected', () => {
    const selectComp = wrapper.find('Select');
    selectComp.prop('onChange')({ target: { value: '2' } });
    expect(wrapper.state().selectedRouteId).toBe('2');
  });

  it('should run handleAddRoute when the add button is clicked', () => {
    const instance = wrapper.instance();
    const buttonClickHandler = wrapper.find(Button).prop('onClick');
    expect(buttonClickHandler).toEqual(instance.handleAddRoute);
  });

  it('should pass route object into AddRoute when the add button is clicked', () => {
    wrapper.find(Button).prop('onClick')();
    expect(addRoute).toBeCalledWith({ path: 'a', routeCompId: '2', routerCompId: '3' });
  });

  it('should contain two RoutesContainer MUI components', () => {
    expect(wrapper.find(RouteDisplay)).toHaveLength(2);
  });
});
