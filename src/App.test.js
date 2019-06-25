import 'jest-dom/extend-expect';
import React from 'react';
import {
  render,
  wait,
  fireEvent,
  getByText,
  act
} from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

it('fetch data normally', async () => {
  const { container } = render(<App />);

  act(() => {
    fireEvent.change(container.querySelector('input'), {
      target: { value: 'A' }
    });
  });
  expect(container.querySelector('input').value).toEqual('A');
  expect(container.querySelector('.loading')).toBeInTheDocument();

  act(() => {
    jest.runAllTimers();
  });

  await wait(() => {
    getByText(container, 'A - 1');
    getByText(container, 'A - 2');
    getByText(container, 'A - 3');
  });
});

it('fetch data with race condition', async () => {
  const { container } = render(<App />);

  act(() => {
    fireEvent.change(container.querySelector('input'), {
      target: { value: 'A' }
    });
  });
  expect(container.querySelector('input').value).toEqual('A');
  expect(container.querySelector('.loading')).toBeInTheDocument();

  act(() => {
    fireEvent.change(container.querySelector('input'), {
      target: { value: 'A' }
    });
  });
  expect(container.querySelector('input').value).toEqual('A');

  act(() => {
    fireEvent.change(container.querySelector('input'), {
      target: { value: 'B' }
    });
  });
  expect(container.querySelector('input').value).toEqual('B');

  act(() => {
    jest.runAllTimers();
  });

  await wait(() => {
    getByText(container, 'B - 1');
    getByText(container, 'B - 2');
    getByText(container, 'B - 3');
  });
});
