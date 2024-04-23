import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConverter = () => {

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrency = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchCurrency();
  }, [])

  const convertCurrency = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();
      setConverted(data.rates[to] + " " + to);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-xl w-full mx-5 my-10 p-5 bg-white rounded-lg shadow-md">
        <h2 className="mb-5 text-2xl font-semibold text-gray-800 text-center">Currency Converter</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <Dropdown currencies={currencies} title="From:" currency={from} setCurrency={setFrom} />
          <div className="flex justify-center mb-5 sm:mb-0">
            <button onClick={swapCurrency} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
              <HiArrowsRightLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <Dropdown currencies={currencies} title="To:" currency={to} setCurrency={setTo} />
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-center">
          <label htmlFor="amount" className="w-full md:w-1/3 p-2 text-gray-700">Amount:</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"
            className="w-full md:w-2/3 p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 right-5" />
        </div>

        <div className="mt-6 flex justify-end">
          <button className={`p-3 bg-indigo-500 text-white rounded-md transition duration-300 hover:bg-indigo-600 ${loading && 'opacity-50 cursor-not-allowed'}`}
            onClick={convertCurrency} disabled={loading}>
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>

        <div className="mt-4 text-lg font-serif text-green-600">
          {converted && `Converted Amount: ${converted}`}
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter;
