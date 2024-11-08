interface DashboardProps {
    bearerToken: string; // Accept the Bearer token as a prop
  }
  
  interface Activity {
    description: string;
    order_state: string;
    order_type: string;
    token_name: string;
    network_name: string;
    quantity: string;
    tx_hash: string;
    timestamp: string;
  }
  
  interface PortfolioResponse {
    status: string;
    data: {
      total: number;
      activity: Activity[];
    };
  }

  interface AptosTransaction {
    network_name: string; // 'aptos' for Aptos
    transaction: {
      function: string; // The function to call in the transaction
      typeArguments: any[]; // Type arguments for the function
      functionArguments: any[]; // Arguments to pass to the function
    };
  }
  interface SolanaTransaction {
    network_name: string; // 'solana' for Solana
    transaction: {
      instructions: {
        keys: Array<{ pubkey: string; isSigner: boolean; isWritable: boolean }>; // The keys involved in the transaction
        programId: string; // The program ID (e.g., token program or custom contract)
        data: number[]; // The transaction data (encoded bytes for the instruction)
      };
      signer: string; // The signer's public key
    };
  }
  interface EvmTransaction {
    network_name: string; // 'evm' for Ethereum, Polygon, etc.
    transaction: {
      from: string; // Sender's address
      to: string; // Recipient's address
      value: string; // Amount to send (in Ether or token units)
      data: string; // Optional data, for smart contract interaction or token transfer
    };
  }
  
  interface ProtocolInfo {
    name: string;
    stakingInfo: string;
    logo: string;
  }