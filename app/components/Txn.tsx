import React, { useState, useEffect } from 'react';

const protocolData = {
  Tortuga: 'aptos',
  EVM: 'evm',
  Solana: 'solana',
};

interface Protocol {
  logo: string;
  name: string;
  stakingInfo: string;
}

interface TransactionFormProps {
  selectedProtocols: Protocol[]; // Array of selected protocol objects
}

const TransactionForm: React.FC<TransactionFormProps> = ({ selectedProtocols }) => {
  const [network, setNetwork] = useState<string>(''); // Default empty network
  const [fromAddresses, setFromAddresses] = useState<{ [key: string]: string }>({}); // Store "from" addresses for each protocol
  const [toAddresses, setToAddresses] = useState<{ [key: string]: string }>({}); // Store "to" addresses for each protocol
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [typeArguments, setTypeArguments] = useState('');
  const [functionArguments, setFunctionArguments] = useState('');

  // Dynamically set the network based on the selected protocol (using the first selected protocol as the default)
  useEffect(() => {
    if (selectedProtocols.length > 0) {
      setNetwork(protocolData[selectedProtocols[0].name]); // Set the first protocol's network type
    }
  }, [selectedProtocols]);

  // Handle "From" and "To" Address Changes
  const handleFromAddressChange = (protocolName: string, address: string) => {
    setFromAddresses((prevState) => ({ ...prevState, [protocolName]: address }));
  };

  const handleToAddressChange = (protocolName: string, address: string) => {
    setToAddresses((prevState) => ({ ...prevState, [protocolName]: address }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Iterate through selected protocols and build transaction data for each one
      selectedProtocols.forEach((protocol) => {
        const networkType = protocolData[protocol.name];

        let transactionData;
        if (networkType === 'evm') {
          transactionData = {
            network_name: 'evm',
            transaction: {
              from: fromAddresses[protocol.name],
              to: toAddresses[protocol.name],
              value: value,
              data: data,
            },
          };
        } else if (networkType === 'solana') {
          transactionData = {
            network_name: 'solana',
            transaction: {
              instructions: {
                keys: [
                  { pubkey: fromAddresses[protocol.name], isSigner: true, isWritable: true },
                  { pubkey: toAddresses[protocol.name], isSigner: false, isWritable: true },
                ],
                programId: 'program-id-placeholder',
                data: [],
              },
              signer: fromAddresses[protocol.name],
            },
          };
        } else if (networkType === 'aptos') {
          transactionData = {
            network_name: 'aptos',
            transaction: {
              function: functionName,
              typeArguments: JSON.parse(typeArguments || '[]'),
              functionArguments: JSON.parse(functionArguments || '[]'),
            },
          };
        }

        console.log('Transaction Data:', transactionData);
        // Execute the transaction (dummy alert for now)
        alert(`Transaction executed on ${protocol.name} successfully!`);
      });
    } catch (error) {
      console.error('Transaction Error:', error);
      alert('Transaction Failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl text-center text-gray-800 mb-6">Stake</h2>

      {/* Display selected protocols */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700">Through</h3>
        <ul className="list-disc text-xl font-medium pl-6 text-purple-900">
          {selectedProtocols.map((protocol, index) => (
            <li key={index}>{protocol.name}</li>
          ))}
        </ul>
      </div>

      {/* Dynamic Address Inputs for Each Protocol */}
      {selectedProtocols.map((protocol) => (
        <div key={protocol.name} className="mb-6">
          <h4 className="text-lg font-medium text-gray-700">{protocol.name} Network</h4>

          <div>
            <label htmlFor={`from-${protocol.name}`} className="block mt-4 text-sm font-medium text-gray-700">From Address</label>
            <input
              type="text"
              id={`from-${protocol.name}`}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder={`Enter ${protocol.name} sender address`}
              value={fromAddresses[protocol.name] || ''}
              onChange={(e) => handleFromAddressChange(protocol.name, e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor={`to-${protocol.name}`} className="block mt-4 text-sm font-medium text-gray-700">To Address</label>
            <input
              type="text"
              id={`to-${protocol.name}`}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder={`Enter recipient address`}
              value={toAddresses[protocol.name] || ''}
              onChange={(e) => handleToAddressChange(protocol.name, e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor={`to-${protocol.name}`} className="block mt-4 text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              id={`to-${protocol.name}`}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder={`Enter amount`}
              value={toAddresses[protocol.name] || ''}
              onChange={(e) => handleToAddressChange(protocol.name, e.target.value)}
              required
            />
          </div>
        </div>
      ))}

      {/* Protocol-Specific Fields for Aptos */}
      {network === 'aptos' && (
        <>
          <div className="mb-6">
            <label htmlFor="functionName" className="block text-sm font-medium text-gray-700">Function Name</label>
            <input
              type="text"
              id="functionName"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="e.g. stake"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="typeArguments" className="block text-sm font-medium text-gray-700">Type Arguments (JSON)</label>
            <input
              type="text"
              id="typeArguments"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="e.g. ['string']"
              value={typeArguments}
              onChange={(e) => setTypeArguments(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="functionArguments" className="block text-sm font-medium text-gray-700">Function Arguments (JSON)</label>
            <input
              type="text"
              id="functionArguments"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="e.g. ['value']"
              value={functionArguments}
              onChange={(e) => setFunctionArguments(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      {/* <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        onClick={handleSubmit}
      >
        Execute Transaction
      </button> */}
    </div>
  );
};

export default TransactionForm;
