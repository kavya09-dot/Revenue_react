import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchFilter from './SearchFilter';

describe('SearchFilter', () => {
  it('should render correctly', () => {
    const { getByLabelText } = render(<SearchFilter filter="" setFilter={() => {}} />);
    expect(getByLabelText(/Search/i)).toBeInTheDocument();
  });

  it('should call setFilter on input change', () => {
    const setFilter = jest.fn();
    const { getByLabelText } = render(<SearchFilter filter="" setFilter={setFilter} />);
    const input = getByLabelText(/Search/i);

    fireEvent.change(input, { target: { value: 'Product' } });
    expect(setFilter).toHaveBeenCalledWith('Product');
  });

  it('should display the correct value in the input field', () => {
    const { getByLabelText } = render(<SearchFilter filter="Test" setFilter={() => {}} />);
    const input = getByLabelText(/Search/i);
    expect(input.value).toBe('Test');
  });
});
