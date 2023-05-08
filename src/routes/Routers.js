import React, { useState,useEffect }from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Cointable from "../components/ui/Tredingcoin/Cointable";
import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";
import Chart from  "../components/ui/Tredingcoin/Banner/chart"
import Mynft from "../pages/Mynft";

// Contract 
import { ethers } from "ethers";
import Abi from "../contracts/Nft_abi.json"

const Routers = () => {

  const [State, setState] = useState([])
  

  useEffect(() => {
    const Get_Contract = async () => {
      // new:0xA36e74249cfeE80bA526c0Cc0e949B69C163CEb1
      //   0xA36e74249cfeE80bA526c0Cc0e949B69C163CEb1
      const contract_add = '0x65C8da0aB5157d42c1fb229E2BE390c950292aBf';
      const contract_abi = Abi;
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contract_add,contract_abi,signer);
      setState({provider,signer,contract});
    }
    Get_Contract();
   
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home state={State}/>} />
      <Route path="/market" element={<Market state={State}/>} />
      <Route path="/Mynft" element={< Mynft state={State}/>} />
      <Route path="/create" element={<Create  state={State}/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/TradingCoin" element={<Cointable />} />
      <Route path="/Chart/:id" element={<Chart />} />
      <Route path="/market/:id" element={<NftDetails state={State} />} />
    </Routes>
  );
};

export default Routers;
