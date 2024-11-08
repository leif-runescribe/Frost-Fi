"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "../components/LoginButton";
import { useOkto, OktoContextType, BuildType, OktoProvider } from "okto-sdk-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TransferTokens from "../components/TransferTokens";
import SendRawTransaction from "../components/SendRawTransaction";
import FNavbar from "../components/FixedNav";
import { motion } from "framer-motion";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { Wallet,  Box, Plus, Cross, CircleX, Loader, Snowflake, DollarSign, TrendingUp, Layers, BarChart2} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import { Activity, ArrowUpRight, Clock, Link as LinkIcon } from 'lucide-react';
import { convertQuantity } from "../utils/Convert";
import { getExplorerUrl } from "../utils/Explorer";
import TokenPortfolioChart from "../components/Pie";
import FundAllocationPieChart from "../components/Pie";
import TransactionForm from "../components/Txn";

export default function Home() {
  console.log('frostboard typ')
  const [portfolio, setPortfolio] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [supportedNetworks, setSupportedNetworks] = useState<string>([]);
  const [supportedTokens, setSupportedTokens] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [nftOrders, setNftOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [oktoJwt, setOktoJwt] = useState<string | null>(null)
  const [isWalletopen, setWalletOpen] = useState(false)
  const {
    isLoggedIn,
    authenticate,
    authenticateWithUserId,
    logOut,
    showWidgetModal,
    setTheme,
    executeRawTransaction,
    executeRawTransactionWithJobStatus,
    getTheme,
  } = useOkto() as OktoContextType;
  const [selectedChains, setSelectedChains] = useState([]);
  console.log('okto key: ',process.env.NEXT_PUBLIC_OKTO_CLIENT_KEY)
  const idToken = useMemo(() => (session ? session.id_token : null), [session]);
  console.log('GOOGLE IDTOKEN: ', idToken)

  async function handleAuthenticate(): Promise<any> {
    console.log('handle authenticate working...')
    if (!idToken) {
      return { result: false, error: "No google login" };
    }
    return new Promise((resolve) => {
      authenticate(idToken, (result: any, error: any) => {
        if (result) {
          console.log("Authentication successful");
          setOktoJwt(result.auth_token)

          resolve({ result: true });
        } else if (error) {
          console.error("Authentication error:", error);
          resolve({ result: false, error });
        } else{
          console.log('something in handleauthenticate', idToken)
        }
      });
    });
  }
  async function handleLogout() {
    try {
      logOut();
      return { result: "logout success" };
    } catch (error) {
      return { result: "logout failed" };
    }
  }
  console.log('is logged in ?',isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      console.log('okto is authed', session?.id_token)
      handleAuthenticate()
      fetchData()
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (oktoJwt != null)
      console.log('okto token:', oktoJwt)

      fetchData()

  }, [oktoJwt])

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
        setPortfolio(data); // Store networks in state
      } catch (err) {
        console.error("Error fetching portfolio", err);
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

        setUserDetails(data); // Store networks in state
      } catch (err) {
        console.error("Error fetching wallet", err);
      }
    }
    const fetchPortfolioActivity = async () => {
      try {
        const response = await axios.get<PortfolioResponse>(
          "https://sandbox-api.okto.tech/api/v1/portfolio/activity",
          {
            headers: {
              'Authorization': `Bearer ${oktoJwt}`,
              'Content-Type': 'application/json',
            },
          });

        if (response.data.status === "success") {
          setActivities(response.data.data.activity);
        } else {
          console.log('portfolio fail', err)
        }
      } catch (err) {
        console.log('failed to fetch potfolio activity', err)

      } finally {
        setLoading(false);
      }
    };
    fetchWallets()
    fetchingNetworks()
    fetchingPortfolio()
    fetchPortfolioActivity();

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
          rounded-2xl p-6 text-center 
          border border-white/20 
          shadow-2xl"
        >
          {oktoJwt &&<h1 className="px-12 text-3xl text-black mb-4 md:mb-0">
            Frostboard
          </h1>}

        </motion.header>
        {!oktoJwt && <div className="flex p-20 rounded-xl text-center items-center justify-center bg-gradient-to-br ">
          <div className="flex flex-col items-center space-y-6 p-8   rounded-lg">
            <div className=" animate-bounce text-black">
              <Snowflake size={48} />
            </div>
            <p className="text-gray-900 text-lg ">Just a little login is what you need <br />to break the ice</p>
            <p className="text-black"><br /> </p>
          </div>
        </div>}
        {/* Data Dashboard */}

        {portfolio ?
        
          <main className="backdrop-blur-xl  rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:px-40 px-12 py-12">
            <header className="w-full max-w-9xl min-w-full flex justify-between items-center mb-8">
              <h1 className="text-white text-4xl font-extrabold"></h1>
              <div className="flex space-x-4">

                <div className="">
                  <button
                    onClick={() => setWalletOpen(true)}
                    className="px-4 text-center items-center py-2 bg-gradient-to-bl from-blue-400 to-purple-500  flex-row text-white rounded-lg animate-gradient-y hover:scale-105 hover:shadow-2xl shadow-purple-500/50 shadow-lg transition"
                  > View Wallets
                    <Wallet> </Wallet>
                  </button>

                  {isWalletopen && (
                    <div className="fixed  rounded-xl h-[450px] inset-0 flex justify-center items-center  bg-opacity-50 z-50">
                      <div className=" bg-gradient-to-bl from-purple-300 via-blue-100 to-pink-200 p-6 rounded shadow-lg relative max-w-lg w-full h-96">
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


                  {/* below wallett icon */}
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
              
              <motion.div
      className=" text-gray-900 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105"
      whileHover={{ scale: 1.05 }}
    ><h1 className="text-2xl">Token Allocation</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left half - Pie Chart */}
        <div className="flex items-center justify-center">
          <FundAllocationPieChart tokens={portfolio.tokens} />
        </div>

        {/* Right half - Analytics Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-700">Portfolio Analytics</h3>

          {/* Analytics Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Example of Token Allocation Card */}
            <div className=" p-4 rounded-lg shadow-md flex items-center space-x-3">
              <Layers className="text-blue-600" size={24} />
              <div>
                <h4 className="text-sm font-medium">Total Tokens</h4>
                <p className="text-gray-700 ">{portfolio.total}</p>
              </div>
            </div>

            {/* Example of Investment Value */}
            <div className=" p-4 rounded-lg shadow-md flex items-center space-x-3">
              <DollarSign className="text-green-600" size={24} />
              <div>
                <h4 className="text-sm font-medium">Investment Value</h4>
                <p className="text-gray-900 ">102.9</p>
              </div>
            </div>

            {/* Example of Performance */}
            <div className=" p-4 rounded-lg shadow-md flex items-center space-x-3">
              <TrendingUp className="text-purple-600" size={24} />
              <div>
                <h4 className="text-sm font-medium">Performance</h4>
                <p className="text-green-900 ">+15%</p>
              </div>
            </div>

            {/* Example of Allocation Distribution */}
            <div className=" p-4 rounded-lg shadow-md flex items-center space-x-3">
              <BarChart2 className="text-yellow-600" size={24} />
              <div>
                <h4 className="text-sm font-medium">Allocation</h4>
                <p className="text-gray-700 ">    {portfolio.tokens.map((token) => token.token_name).join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-sm text-gray-800">
            <p>Data based on live token holdings.</p>
          </div>
        </div>
      </div>
    </motion.div>   


              <motion.div
                className="  text-gray-900 rounded-lg p-6 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <Paper 
                  elevation={5}
                  sx={{
                    background: 'linear-gradient(to top right, #d6b3f7, #93c5fd, #e5e7eb)',
                    color: 'white',
                    borderRadius: 5,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ArrowUpRight className="t" size={24} />
                      <h2 className="text-2xl  text-black">Portfolio Activity</h2>
                    </div>
                    <Chip
                      label="Live Updates"
                      color="default"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(25, 118, 210, 0.15)',
                        fontWeight: '',
                        textTransform: 'uppercase',
                      }}
                    />
                  </div>

                  <TableContainer sx={{ maxHeight: 600, padding: '0 16px' }}>
        <Table stickyHeader>
          <TableHead>
          <TableRow>
  <TableCell 
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 16px',
      borderRight: '1px solid  black',
      borderBottom: '1px solid black',  // Adding border to the right
      backgroundColor: 'transparent'  // Removing the white background
    }}
  >
    Transaction
  </TableCell>
  <TableCell 
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 16px',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      backgroundColor: 'transparent'
    }}
  >
    Token
  </TableCell>
  <TableCell 
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 16px',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      backgroundColor: 'transparent'
    }}
  >
    Network
  </TableCell>
  <TableCell 
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 16px',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      backgroundColor: 'transparent'
      
    }}
  >
    Quantity
  </TableCell>
  <TableCell 
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 16px',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      backgroundColor: 'transparent'
    }}
  >
    Hash
  </TableCell>
  <TableCell 
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 16px',
      borderBottom: '1px solid black',
      backgroundColor: 'transparent'
    }}
  >
    Time
  </TableCell>
</TableRow>

          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                  '& td': {
                    color: 'white',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '12px 16px',
                  },
                }}
              >
                <TableCell sx={{borderRight: '1px solid  black',
      borderBottom: '1px solid black'}} >
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="" size={20} />
                    <span className="text-black">{activity.description}</span>
                  </div>
                </TableCell>
                <TableCell sx={{borderRight: '1px solid  black',
      borderBottom: '1px solid black',}}>
                  <Chip
                    label={activity.token_name}
                    color="default"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.12)',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
                <TableCell sx={{borderRight: '1px solid  black',
      borderBottom: '1px solid black',}}>
                  <Chip
                    label={activity.network_name}
                    color="default"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(156, 39, 176, 0.12)',
                      
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
                <TableCell sx={{borderRight: '1px solid  black',
      borderBottom: '1px solid black',}}>
                  <span className="font-mono text-xl text-black">{convertQuantity(activity.network_name, activity.quantity)}</span>
                </TableCell>
                <TableCell sx={{borderRight: '1px solid  black',
      borderBottom: '1px solid black',}}>
                  <IconButton
                    size="small"
                    href={getExplorerUrl(activity.network_name, activity.transaction_hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'black',
                      '&:hover': { color: 'blue' },
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      <span className="font-mono text-sm">
                        {`${activity.transaction_hash.substring(0, 6)}...${activity.transaction_hash.substring(activity.transaction_hash.length - 4)}`}
                      </span>
                    </div>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Chip
                    label={new Date(activity.timestamp * 1000).toLocaleString('en-GB', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                    color="default"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(156, 39, 176, 0.12)',
                      
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
              </Paper>
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

              <motion.div
                className="bg-white/10 shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <TransactionForm/>
              </motion.div>



            </div>
          </main>
          

          : oktoJwt && <div className="flex p-20 rounded-xl text-center items-center justify-center bg-gradient-to-br ">
    <div className="flex flex-col items-center space-y-6 p-8   rounded-lg">
      <div className="animate-spin text-black">
        <Loader size={48} />
      </div>
      <p className="text-gray-900 text-lg ">Fetching...<br />if this takes too much time, try logging out and logging in again</p>
    </div>
  </div>
}

{/* Modal Trigger */ }

      </div >
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

    </main >
  );
}
