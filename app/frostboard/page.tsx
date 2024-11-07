"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "../components/LoginButton";
import { useOkto, OktoContextType, BuildType, OktoProvider } from "okto-sdk-react";
import GetButton from "../components/GetButton";
import TransferTokens from "../components/TransferTokens";
import { useAppContext } from "../components/AppContext";
import AuthButton from "../components/AuthButton";
import SendRawTransaction from "../components/SendRawTransaction";
import FNavbar from "../components/FixedNav";
import { motion } from "framer-motion";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { Wallet, Layers, User, Box, Plus, Cross, CircleX, Loader, Bird, Snowflake } from "lucide-react";
import { Iceberg } from "next/font/google";


export default function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [supportedNetworks, setSupportedNetworks] = useState<string>([]);
  const [supportedTokens, setSupportedTokens] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [nftOrders, setNftOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession();
  const { apiKey, setApiKey, buildType, setBuildType } = useAppContext();
  const [oktoJwt, setOktoJwt] = useState<string | null>(null)
  const [isWalletopen, setWalletOpen] = useState(false)
  const {
    isLoggedIn,
    authenticate,
    authenticateWithUserId,
    logOut,
    showWidgetModal,
    setTheme,
    getTheme,
  } = useOkto() as OktoContextType;
  const [selectedChains, setSelectedChains] = useState([]);
  const idToken = useMemo(() => (session ? session.id_token : null), [session]);

  async function handleAuthenticate(): Promise<any> {
    if (!idToken) {
      return { result: false, error: "No google login" };
    }
    return new Promise((resolve) => {
      authenticate(idToken, (result: any, error: any) => {
        if (result) {
          console.log("Authentication successful", result.auth_token);
          setOktoJwt(result.auth_token)

          resolve({ result: true });
        } else if (error) {
          console.error("Authentication error:", error);
          resolve({ result: false, error });
        }
      });
    });
  }
  console.log('this env: ', process.env.NEXTAUTH_SECRET)
  async function handleLogout() {
    try {
      logOut();
      return { result: "logout success" };
    } catch (error) {
      return { result: "logout failed" };
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      handleAuthenticate()
      fetchData()
      console.log(supportedNetworks)
      console.log("Okto authenticated");
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    if (oktoJwt != null)
      fetchData()

  }, [oktoJwt])
  useEffect(() => {
    console.log("Selected Chains:", selectedChains);
  }, [selectedChains]);
  //fetch all that
  const fetchData = async () => {
    const fetchingNetworks = async () => {
      try {
        const response = await axios.get('https://sandbox-api.okto.tech/api/v1/supported/networks', {
          headers: {
            'Authorization': `Bearer ${oktoJwt}`,
            'Content-Type': 'application/json',
          },
        });
        const data = response.data.data.network;
        setSupportedNetworks(data); // Store networks in state
      } catch (err) {
        console.error("Error fetching networks", err);
      }
    };
    const fetchingPortfolio = async () => {
      try {
        const response = await axios.get('https://sandbox-api.okto.tech/api/v1/portfolio', {
          headers: {
            'Authorization': `Bearer ${oktoJwt}`,
            'Content-Type': 'application/json',
          },
        });
        const data = response.data.data;
        console.log('portofollos hermanos', data)
        setPortfolio(data); // Store networks in state
      } catch (err) {
        console.error("Error fetching networks", err);
      }
    };
    const fetchWallets = async () => {
      try {
        const response = await axios.get('https://sandbox-api.okto.tech/api/v1/wallet', {
          headers: {
            'Authorization': `Bearer ${oktoJwt}`,
            'Content-Type': 'application/json',
          },
        });
        const data = response.data.data.wallets;
        console.log('wallet: ',data)

        setWallets(data); // Store networks in state
      } catch (err) {
      
        if (err.response && err.response.status === 400) {
          // If 400 error, create the wallet first
          console.log("No wallets found. Creating a new wallet...");
          await createWallet(); // Call createWallet function
          // After creating, retry fetching the wallets
          fetchWallets();
        } else {
          console.error("Error fetching wallet", err);
        }
      }
    }
    const createWallet = async () => {
      try {
        const response = await axios.post('https://sandbox-api.okto.tech/api/v1/wallet', {}, {
          headers: {
            'Authorization': `Bearer ${oktoJwt}`,
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        console.log("Wallet created successfully: ", data);
      } catch (err) {
        console.error("Error creating wallet", err);
      }
    };
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('https://sandbox-api.okto.tech/api/v1/user_from_token', {
          headers: {
            'Authorization': `Bearer ${oktoJwt}`,
            'Content-Type': 'application/json',
          },
        });
        
        const data = response.data.data;
        console.log('user details ',data)

        setUserDetails(data); // Store networks in state
      } catch (err) {
        console.error("Error fetching wallet", err);
      }
    }
    fetchUserDetails()
    fetchWallets()
    fetchingNetworks()
    fetchingPortfolio()
  };
  const handleCheckboxChange = (network) => {
    setSelectedChains((prevSelected) => {
      const isAlreadySelected = prevSelected.some((chain) => chain.chain_id === network.chain_id);
      if (isAlreadySelected) {
        // Remove from selected chains
        return prevSelected.filter((chain) => chain.chain_id !== network.chain_id);
      } else {
        // Add to selected chains
        return [...prevSelected, network];
      }
    });
  };

  const handleWallet = () => {
    setWalletOpen(true)
  }

  const closeWallet = () => {
    setWalletOpen(false)
  }

  type Network = {
    network_name: string;
    chain_id: string;
    logo: string | null;
  };

  return (
    <main className="min-h-screen py-12 items-center flex pb-20 flex-col relative overflow-hidden" style={{ backgroundImage: "url('/d.avif')" }} >

      <FNavbar />

      <div className="backdrop-blur-xl min-w-[px] mt-20  bg-white/10 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center 
          bg-white/10 
          rounded-2xl p-6 
          border border-white/20 
          shadow-2xl"
        >
          <h1 className="text-3xl text-black mb-4 md:mb-0">
            Frostboard
          </h1>

        </motion.header>
        {!oktoJwt && <div className="flex p-20 rounded-xl text-center items-center justify-center bg-gradient-to-br ">
        <div className="flex flex-col items-center space-y-6 p-8   rounded-lg">
          <div className=" animate-bounce text-black">
            <Snowflake size={48} />
          </div>
          <p className="text-gray-900 text-lg ">Just a little login is what you need <br/>to break the ice</p>
          <p className="text-black"><br/> </p>
        </div>
        </div>}
        {/* Data Dashboard */}
        {portfolio ? 
        <main className="backdrop-blur-xl  rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:px-40 px-12 py-12">
          <header className="w-full max-w-9xl min-w-full flex justify-between items-center mb-8">
            <h1 className="text-white text-4xl font-extrabold"></h1>
            <div className="flex space-x-4">
              
              <div>
                <button
                  onClick={() => setWalletOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500  flex-row text-white rounded-lg animate-gradient-y hover:scale-105 hover:shadow-2xl shadow-purple-500/50 shadow-lg transition"
                >
                  <Wallet> Wallets</Wallet>
                </button>

                {isWalletopen && (
                  <div className="fixed  rounded-xl h-[450px] inset-0 flex justify-center items-center  bg-opacity-50 z-50">
                    <div className=" bg-gradient-to-tr from-purple-300 via-blue-200 to-gray-200 p-6 rounded shadow-lg relative max-w-lg w-full h-96">
                      <button
                        onClick={closeWallet}
                        className="absolute top-2 right-2 text-gray-900"
                      >
                        <CircleX />
                      </button>
                      <h3 className="text-xl text-gray-900  mb-4">Wallet Details</h3>

                      {/* Scrollable container for wallet details */}
                      <div className="h-72  w-full pr-20 text-black overflow-y-auto">
                        {wallets.map((wallet, index) => (
                          <div key={index} className="mb-4">
                            <p>Network Name: <span className="text-cyan-900 text-xl">{wallet.network_name}</span></p>
                            <p >Address: <span className="text-gray-900 font-medium">{wallet.address}</span></p>
                            <p>Success: {wallet.success ? "Yes" : "No"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1  lg:grid-cols-1 gap-20 w-full max-w-8xl">

            {/* Portfolio Card */}
            <motion.div
      className="bg-white/10 shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-xl text-gray-900 font-semibold mb-4">
        <Wallet className="inline-block mr-2" /> Portfolio
      </h2>

      <p className="text-gray-900 text-lg ">
        {portfolio ? `Total Tokens ${portfolio.total}` : 'Loading...'}
      </p>
      
      <div className="mt-4">
        {portfolio && portfolio.tokens ? (
          portfolio.tokens.map((token, index) => (
            <div
              key={index}
              className=" bg-gradient-to-tr from-purple-300 via-blue-200 to-gray-200 p-4 my-2 rounded-lg shadow-md"
            >
              <h3 className="text-gray-900 text-md  mb-1">{token.token_name}</h3>
              
              <p className="text-sm text-gray-600">
                Quantity: <span className="text-gray-900">{token.quantity}</span>
              </p>

              <p className="text-sm text-gray-600">
                Amount in INR: <span className="text-gray-900">₹{token.amount_in_inr}</span>
              </p>

              <p className="text-sm text-gray-600">
                Network: <span className="text-gray-900">{token.network_name}</span>
              </p>

              {token.token_address && (
                <p className="text-sm text-gray-600">
                  Address: <span className="text-gray-900">{token.token_address}</span>
                </p>
              )}
              
              {token.token_image && (
                <img
                  src={token.token_image}
                  alt={`${token.token_name} logo`}
                  className="w-8 h-8 mt-2"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-900">No tokens available</p>
        )}
      </div>
    </motion.div>

            {/* Supported Networks Card */}
            <motion.div
      className="bg-white/10 shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        <Layers className="inline-block mr-1" />
        Supported Networks
      </h2>
      <p className="text-sm text-gray-900 mb-4">Explore available networks</p>

      {/* Checkbox selection for networks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {supportedNetworks.map((network) => (
          <label key={network.chain_id} className="flex items-center space-x-2 p-2 rounded-lg shadow-sm border border-gray-300">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              checked={selectedChains.some((chain) => chain.chain_id === network.chain_id)}
              onChange={() => handleCheckboxChange(network)}
            />
            <img
              src={network.logo || 'https://png.pngtree.com/png-vector/20191016/ourmid/pngtree-blockchain-artificial-intelligence-vector-icon-png-image_1803928.jpg'}
              alt={network.network_name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-900">{network.network_name}</span>
          </label>
        ))}
      </div>

      {/* Display selected networks */}
      {selectedChains.length > 0 && (
        <div className="mt-4 p-3 border border-gray-200 rounded-lg ">
          <h3 className="font-semibold text-gray-900 text-md mb-2">Selected Networks:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {selectedChains.map((chain) => (
              <div key={chain.chain_id} className="flex items-center space-x-2">
                <img
                  src={chain.logo || 'https://png.pngtree.com/png-vector/20191016/ourmid/pngtree-blockchain-artificial-intelligence-vector-icon-png-image_1803928.jpg'}
                  alt={chain.network_name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-900">{chain.network_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>

            {/* Supported Tokens Card */}
            <motion.div
              className="bg-white/10 shadow-lg text-gray-900 rounded-lg p-6 transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold mb-4"><User className="inline-block mr-2" />Supported Tokens</h2>
              <p>{supportedTokens.length} Tokens Available</p>
              <p className="text-sm text-gray-800">View all supported tokens</p>
            </motion.div>
           
          </div>
        </main>

        :  oktoJwt&& <div className="flex p-20 rounded-xl text-center items-center justify-center bg-gradient-to-br ">
        <div className="flex flex-col items-center space-y-6 p-8   rounded-lg">
          <div className="animate-spin text-black">
            <Loader size={48} />
          </div>
          <p className="text-gray-900 text-lg ">Fetching...<br/>if this takes too much time, try logging out and logging in again</p>
        </div>
        </div>            }

        {/* Modal Trigger */}
        
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8">

        
        {/* <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            showWidgetModal();
          }}
        >
          Show Modal
        </button> */}
      </div>
      
    </main>
  );
}
