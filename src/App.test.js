import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.useFakeTimers();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('update input', () => {
  const app = mount(<App />);
  act(() => {
    app.find('input').prop('onChange')({
      target: {
        value: 'keywords'
      }
    });
  });
  app.update();
  expect(app.find('input').prop('value')).toEqual('keywords');
});

it('fetch data', () => {
  const app = mount(<App />);
  act(() => {
    app.find('input').prop('onChange')({
      target: {
        value: 'keywords'
      }
    });
  });
  app.update();
  expect(app.find('input').prop('value')).toEqual('keywords');
  expect(app.find('Loading')).not.toBeNull();

  act(() => {
    jest.runAllTimers();
    app.update();
  });

  console.log(app.debug());
});
