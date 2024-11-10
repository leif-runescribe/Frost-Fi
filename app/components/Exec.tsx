import { useState } from 'react';
import axios from 'axios';

const TransactionExecutor = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus('');
    setTransactionHash('');

    // Make the API call to execute the transaction
    try {
      const response = await axios.post(
        'https://sandbox-api.okto.tech/api/v1/rawtransaction/execute?network_name=POLYGON',
        {
          network_name: 'POLYGON',
          transaction: {
            from,
            to,
            data: '0x', // Assuming no additional data
            value: `0x${(parseInt(value, 10) * 1000000000000000000).toString(16)}`, // Convert to hex (18 decimals for ETH-like tokens)
          },
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_SECRET_TOKEN',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        const jobId = response.data.data.jobId;
        setJobId(jobId);
        checkTransactionStatus(jobId);
      }
    } catch (error) {
      setStatus('Error while sending transaction');
      setLoading(false);
    }
  };

  const checkTransactionStatus = async (jobId: string) => {
    try {
      const response = await axios.get(
        `https://sandbox-api.okto.tech/api/v1/rawtransaction/status?order_id=${jobId}`,
        {
          headers: {
            Authorization: 'Bearer YOUR_SECRET_TOKEN',
          },
        }
      );

      if (response.data.status === 'success') {
        const job = response.data.data.jobs[0];
        if (job.status === 'SUCCESS') {
          setStatus('Transaction Successful');
          setTransactionHash(job.transaction_hash);
        } else {
          setStatus('Transaction Failed');
        }
      } else {
        setStatus('Error while fetching transaction status');
      }
    } catch (error) {
      setStatus('Error while fetching status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Execute Blockchain Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">
            From Address
          </label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            To Address
          </label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">
            Value (in Ether)
          </label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm"
            placeholder="Amount in Ether"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Execute Transaction'}
          </button>
        </div>
      </form>

      {status && (
        <div className="mt-6 text-center">
          <p className={`text-xl font-semibold ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
          {transactionHash && (
            <p className="mt-4 text-sm text-gray-500">
              Transaction Hash: <a href={`https://polygonscan.com/tx/${transactionHash}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                {transactionHash}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionExecutor;
