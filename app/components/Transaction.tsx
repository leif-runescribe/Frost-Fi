import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface OktoTransactionProps {
  apiKey: string;
  network: string;
  from: string;
  to: string;
  valueInWei: string;
}

interface TransactionStatus {
  loading: boolean;
  error: string | null;
  jobId: string | null;
  txHash: string | null;
  txStatus: string | null;
}

const TransactionComponent: React.FC<OktoTransactionProps> = ({
  apiKey,
  network,
  from,
  to,
  valueInWei
}) => {
  const [status, setStatus] = useState<TransactionStatus>({
    loading: false,
    error: null,
    jobId: null,
    txHash: null,
    txStatus: null
  });

  const executeTransaction = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch('https://sandbox-api.okto.tech/api/v1/rawtransaction/execute', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          network_name: network,
          transaction: {
            from,
            to,
            data: '0x',
            value: `0x${valueInWei}`
          }
        })
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setStatus(prev => ({ ...prev, jobId: data.data.jobId }));
      } else {
        throw new Error(data.message || 'Transaction failed');
      }
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Transaction failed' 
      }));
    }
  };

  const pollTransactionStatus = async (jobId: string) => {
    try {
      const response = await fetch(`https://sandbox-api.okto.tech/api/v1/rawtransaction/status?order_id=${jobId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const data = await response.json();
      
      if (data.status === 'success' && data.data.jobs[0]) {
        const txStatus = data.data.jobs[0].status;
        const txHash = data.data.jobs[0].transaction_hash;
        
        setStatus(prev => ({
          ...prev,
          txStatus,
          txHash,
          loading: txStatus !== 'SUCCESS' && txStatus !== 'FAILED'
        }));
      }
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to fetch transaction status' 
      }));
    }
  };

  useEffect(() => {
    if (status.jobId && (status.txStatus !== 'SUCCESS' && status.txStatus !== 'FAILED')) {
      const pollInterval = setInterval(() => {
        pollTransactionStatus(status.jobId!);
      }, 3000);

      return () => clearInterval(pollInterval);
    }
  }, [status.jobId, status.txStatus]);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Transaction Details</h2>
          <button
            onClick={executeTransaction}
            disabled={status.loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {status.loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing
              </>
            ) : 'Execute'}
          </button>
        </div>

        {status.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{status.error}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Network:</span>
            <span className="font-medium">{network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">From:</span>
            <span className="font-mono text-sm truncate max-w-[200px]">{from}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">To:</span>
            <span className="font-mono text-sm truncate max-w-[200px]">{to}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Value (Wei):</span>
            <span className="font-mono text-sm">{valueInWei}</span>
          </div>
        </div>

        {status.jobId && (
          <div className="space-y-2 border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Job ID:</span>
              <span className="font-mono text-sm">{status.jobId}</span>
            </div>
            
            {status.txStatus && (
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  status.txStatus === 'SUCCESS' ? 'text-green-600' :
                  status.txStatus === 'FAILED' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {status.txStatus}
                </span>
              </div>
            )}
            
            {status.txHash && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tx Hash:</span>
                <span className="font-mono text-sm truncate max-w-[200px]">{status.txHash}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionComponent;