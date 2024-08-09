import React, { useState,  useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatNumber from './formatNumber';

const ProductTable = ({ products, onFilterChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filter, setFilter] = useState('');

  const sortedProducts = useMemo(() => {
    const sortableItems = [...products];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  const filteredProducts = useMemo(() => 
    sortedProducts.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    ), [sortedProducts, filter]);


  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filteredProducts);
    }
  }, [filteredProducts, onFilterChange]);
  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>Name</th>
            {/* /*<th onClick={() => requestSort('unitPrice')}>Unit Price</th>
             //<th onClick={() => requestSort('sold')}>Sold</th> */}
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={`${product.id}-${index}`}>
              <td>{product.name}</td>
              {/* <td>${product.unitPrice.toFixed(2)}</td>
              <td>{product.sold}</td> */}
                <td>${formatNumber(product.unitPrice * product.sold)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      unitPrice: PropTypes.number.isRequired,
      sold: PropTypes.number.isRequired
    })
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default ProductTable;
