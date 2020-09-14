import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import App, { Table } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('has a valid snapshot', () => {
    const component= renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

});

describe('Table', () => {
  const props = {
    list: {
      hits: [
        {title: '1', author: '1', num_comments:'1', points: 2, objectID: 'y' },
        {title: '2', author: '2', num_comments:'1', points: 2, objectID: 'z' },
      ]
    }
  };

  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  test('has a valid snapshot', () => {
    const component= renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('shows to items in the list', () => {
    const element = shallow(
      <Table {...props}/>
    );

    expect(element.find('.table-row').length).toBe(2);
  });

})


