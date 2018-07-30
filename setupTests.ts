import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
import * as selectorMatchers from 'jest-enzyme-selector-matchers';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer(emotion));

expect.extend(selectorMatchers);
