export const getExplorerUrl = (networkName: string, transactionHash: string): string => {
    let explorerUrl: string;
  
    switch (networkName) {
      case 'APTOS':
        // For mainnet Aptos
        explorerUrl = `https://explorer.aptoslabs.com/txn/${transactionHash}`;
        break;
      case 'APTOS_TESTNET':
        // For testnet Aptos
        explorerUrl = `https://explorer.aptoslabs.com/tx/${transactionHash}`;
        break;
      case 'SOLANA':
        // For mainnet Solana
        explorerUrl = `https://explorer.solana.com/tx/${transactionHash}?cluster=mainnet`;
        break;
      case 'SOLANA_TESTNET':
        // For testnet Solana
        explorerUrl = `https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`;
        break;
      case 'POLYGON':
        // For mainnet Polygon
        explorerUrl = `https://polygonscan.com/tx/${transactionHash}`;
        break;
      case 'POLYGON_TESTNET_AMOY':
        // For testnet Polygon
        explorerUrl = `https://amoy.polygonscan.com/tx/${transactionHash}?network=testnet`;
        break;
      case 'BASE':
        // For mainnet Base
        explorerUrl = `https://basescan.org/tx/${transactionHash}`;
        break;
      default:
        throw new Error(`Unsupported network: ${networkName}`);
    }
  
    return explorerUrl;
  };
  