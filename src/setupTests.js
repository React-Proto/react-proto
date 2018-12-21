import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// import Enzyme, { shallow, render, mount } from 'enzyme';
// Enzyme.configure({ adapter: new Adapter() });

// global.shallow = shallow;
// global.render = render;
// global.mount = mount;
