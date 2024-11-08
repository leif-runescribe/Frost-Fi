import React, { useState } from 'react';
import { ExecuteRawTransaction, useOkto } from 'okto-sdk-react';


const TransactionForm = () => {
  const [network, setNetwork] = useState('evm'); // Default network
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [typeArguments, setTypeArguments] = useState('');
  const [functionArguments, setFunctionArguments] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let transactionData;

    if (network === 'evm') {
      // EVM Transaction Structure
      transactionData = {
        network_name: 'evm',
        transaction: {
          from: fromAddress,
          to: toAddress,
          value: value,
          data: data,
        },
      } as EvmTransaction;
    } else if (network === 'solana') {
      // Solana Transaction Structure
      transactionData = {
        network_name: 'solana',
        transaction: {
          instructions: {
            keys: [
              { pubkey: fromAddress, isSigner: true, isWritable: true },
              { pubkey: toAddress, isSigner: false, isWritable: true },
            ],
            programId: 'program-id-placeholder', // You would replace this with the actual program ID
            data: [], // Raw transaction data
          },
          signer: fromAddress,
        },
      } as SolanaTransaction;
    } else if (network === 'aptos') {
      // Aptos Transaction Structure
      transactionData = {
        network_name: 'aptos',
        transaction: {
          function: functionName,
          typeArguments: JSON.parse(typeArguments || '[]'),
          functionArguments: JSON.parse(functionArguments || '[]'),
        },
      } as AptosTransaction;
    }

    try {
      // Call executeRawTransaction from Okto SDK
      const result = await executeRawTransaction(transactionData);
      console.log('Transaction Result:', result);
      alert('Transaction Executed Successfully!');
    } catch (error) {
      console.error('Transaction Error:', error);
      alert('Transaction Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 text-center">Execute Raw Transaction</h2>
      <form onSubmit={handleSubmit}>
        {/* Network Selection */}
        <div className="mb-4">
          <label htmlFor="network" className="block text-sm font-medium text-gray-700">Select Network</label>
          <select
            id="network"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="evm">EVM (Ethereum, Polygon)</option>
            <option value="solana">Solana</option>
            <option value="aptos">Aptos</option>
          </select>
        </div>

        {/* From Address Input */}
        <div className="mb-4">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">From Address</label>
          <input
            type="text"
            id="from"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter sender address"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            required
          />
        </div>

        {/* To Address Input */}
        <div className="mb-4">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">To Address</label>
          <input
            type="text"
            id="to"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter recipient address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            required
          />
        </div>

        {/* Value (Amount) Input */}
        <div className="mb-4">
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value (Amount)</label>
          <input
            type="text"
            id="value"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Amount to send"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        {/* Data Input for EVM, Function Name for Aptos */}
        {network === 'evm' && (
          <div className="mb-4">
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data (Optional)</label>
            <input
              type="text"
              id="data"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter data (e.g., contract interaction)"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        )}

        {network === 'aptos' && (
          <>
            <div className="mb-4">
              <label htmlFor="functionName" className="block text-sm font-medium text-gray-700">Function Name</label>
              <input
                type="text"
                id="functionName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="typeArguments" className="block text-sm font-medium text-gray-700">Type Arguments (JSON)</label>
              <input
                type="text"
                id="typeArguments"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="e.g. ['string']"
                value={typeArguments}
                onChange={(e) => setTypeArguments(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="functionArguments" className="block text-sm font-medium text-gray-700">Function Arguments (JSON)</label>
              <input
                type="text"
                id="functionArguments"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="e.g. ['value']"
                value={functionArguments}
                onChange={(e) => setFunctionArguments(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Execute Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
