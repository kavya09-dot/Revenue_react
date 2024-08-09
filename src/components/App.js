import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import formatNumber from './formatNumber';

const App = () => {
  const [branchData, setBranchData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          '/assets/branch1.json',
          '/assets/branch2.json',
          '/assets/branch3.json'
        ];
        
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        
        const combinedData = data.flatMap(branch => branch.products);

        setBranchData(combinedData);
        setFilteredProducts(combinedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalRevenue = (products) => 
    products.reduce((sum, product) => sum + (product.unitPrice * product.sold), 0);
  return (
    <div className="app">
      <h1>Revenue Aggregator</h1>
      <ProductTable 
      products={branchData}
      onFilterChange={setFilteredProducts} />
      <div className="total-revenue">
      <h2>Total Revenue: {formatNumber(totalRevenue(filteredProducts))}</h2>
      </div>
    </div>
  );
};

export default App;
