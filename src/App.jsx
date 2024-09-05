"use client";

import { useState, useEffect } from "react";

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.14,
  CAD: 1.25,
};

const themes = {
  light: "bg-gradient-to-br from-blue-100 to-indigo-200",
  dark: "bg-gradient-to-br from-gray-900 to-indigo-900",
};

export default function TailwindCurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

  const handleConvert = () => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const convertedAmount = (parseFloat(amount) / fromRate) * toRate;
    setResult(convertedAmount.toFixed(2));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen ${themes[theme]} flex items-center justify-center p-4 transition-colors duration-500`}
    >
      <div
        className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-colors duration-500 ${
          theme === "dark" ? "text-white" : "text-white-800"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Currency Converter</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              placeholder="Enter amount"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="fromCurrency"
                className="block text-sm font-medium"
              >
                From
              </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="toCurrency" className="block text-sm font-medium">
                To
              </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-opacity-50 bg-gray-100 dark:bg-gray-700 rounded-lg backdrop-blur-sm">
              <p className="text-center text-2xl font-semibold">
                {amount} {fromCurrency} =
              </p>
              <p className="text-center text-4xl font-bold mt-2">
                {result} {toCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
