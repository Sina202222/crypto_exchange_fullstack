import { useState, useEffect } from 'react';
import api from '../services/api';
import type { Currency } from '../types';

const Market = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await api.getCurrencies();
        setCurrencies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch currencies');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCurrencies();
    const interval = setInterval(fetchCurrencies, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="flex justify-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Market Prices</h1>
      <div className="bg-dark-light rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-dark-DEFAULT">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price (USD)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">24h Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-dark-light divide-y divide-gray-700">
              {currencies.map((currency) => (
                <tr key={currency.id} className="hover:bg-dark-DEFAULT">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {currency.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {currency.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                    ${currency.current_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                    +2.5% {/* این مقدار باید از API دریافت شود */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-primary-DEFAULT text-white rounded hover:bg-primary-dark">
                        Buy
                      </button>
                      <button className="px-3 py-1 bg-secondary-DEFAULT text-white rounded hover:bg-secondary-dark">
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Market;