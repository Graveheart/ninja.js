import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import debounce from 'lodash.debounce';

configure({ adapter: new Adapter() });

// Tell jest to mock lodash.debounce
jest.mock('lodash.debounce');
debounce.mockImplementation((fn) => fn);
