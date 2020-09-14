import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

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
  
})


