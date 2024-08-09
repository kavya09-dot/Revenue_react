// App.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const mockData = [
  {
    products: [
      { id: 1, name: 'Product A', unitPrice: 10, sold: 5 },
      { id: 2, name: 'Product B', unitPrice: 20, sold: 2 },
    ],
  },
  {
    products: [
      { id: 3, name: 'Product C', unitPrice: 30, sold: 1 },
    ],
  },
  {
    products: [
      { id: 4, name: 'Product D', unitPrice: 40, sold: 3 },
    ],
  },
];

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const branchIndex = {
      '/assets/branch1.json': 0,
      '/assets/branch2.json': 1,
      '/assets/branch3.json': 2,
    }[url];

    if (branchIndex !== undefined) {
      return Promise.resolve({
        json: () => Promise.resolve(mockData[branchIndex]),
      });
    }
    
    return Promise.reject(new Error('Not Found'));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders loading state', () => {
  render(<App />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error message on fetch failure', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });
});

test('renders product table and total revenue on successful fetch', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Product C')).toBeInTheDocument();
    expect(screen.getByText('Product D')).toBeInTheDocument();
  });

  // Update this to match the actual rendered text
  expect(screen.getByText(/Total Revenue: 240/)).toBeInTheDocument();
});
