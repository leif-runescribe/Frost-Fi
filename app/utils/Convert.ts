export const convertQuantity = (networkName: string, quantity: string): string => {
    let conversionFactor: number;
  
    // Define conversion factors based on the network and token
    switch (networkName) {
      case 'APTOS':
      case 'APTOS_TESTNET':
        // Aptos uses 1 APT = 1_000_000_000 base units (1 billionth of APT)
        conversionFactor = 1_000_000_000;
        break;
      case 'SOLANA':
      case 'SOLANA_TESTNET':
        // Solana uses 1 SOL = 1_000_000_000 base units (1 billionth of SOL)
        conversionFactor = 1_000_000_000;
        break;
      case 'POLYGON':
      case 'POLYGON_TESTNET_AMOY':
        // Polygon uses 1 MATIC = 1e18 base units (similar to Ethereum's wei)
        conversionFactor = 1e18;
        break;
      default:
        throw new Error(`Unsupported network: ${networkName}`);
    }
  
    // Convert the quantity from base units to the human-readable value
    const humanReadableQuantity = (parseInt(quantity) / conversionFactor).toString();
  
    return humanReadableQuantity;
  };