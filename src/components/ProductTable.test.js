import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductTable from './ProductTable';

const products = [
  { id: '001', name: 'Product 1', unitPrice: 10, sold: 100 },
  { id: '002', name: 'Product 2', unitPrice: 15, sold: 50 },
  { id: '003', name: 'Product 3', unitPrice: 20, sold: 200 },
];

describe('ProductTable', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ProductTable products={products} onFilterChange={() => {}} />);
    expect(getByText(/Product 1/i)).toBeInTheDocument();
    expect(getByText(/Product 2/i)).toBeInTheDocument();
    expect(getByText(/Product 3/i)).toBeInTheDocument();
  });

  it('should filter products correctly', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <ProductTable products={products} onFilterChange={() => {}} />
    );
    const input = getByPlaceholderText(/Filter by name/i);

    fireEvent.change(input, { target: { value: 'Product 2' } });

    expect(getByText(/Product 2/i)).toBeInTheDocument();
    expect(queryByText(/Product 1/i)).toBeNull();
    expect(queryByText(/Product 3/i)).toBeNull();
  });

  it('should sort products correctly', () => {
    const { getByText } = render(<ProductTable products={products} onFilterChange={() => {}} />);
    const nameHeader = getByText(/Name/i);

    fireEvent.click(nameHeader);

    const firstRow = getByText(/Product 3/i);
    expect(firstRow).toBeInTheDocument();

    fireEvent.click(nameHeader);

    const lastRow = getByText(/Product 1/i);
    expect(lastRow).toBeInTheDocument();
  });
});
