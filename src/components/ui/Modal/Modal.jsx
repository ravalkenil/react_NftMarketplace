import React from "react";

import "./modal.css";
import Abi from "../../../contracts/Abi.json";
// import {fundMe} from "../ABIs/fundMe.js";
import { ethers } from 'ethers';
// import { fetchSigner } from '@wagmi/core';
import { useState } from "react";

const Modal = ({ setShowModal }) => {
  const [amount,setAmount] = useState("");
  console.log("css");
  const handleAmountChange = (e) =>{
    console.log(e.target.value);
    setAmount(e.target.value*1000000000000000)
  }
  const sendFund = async()=>{
    // const signer = await fetchSigner();    
    // if (window.ethereum){
    //   console.log("bhsbdf");
    // }
    const {ethereum}= window;
    console.log("this is",amount);

    // const amount=ethers.utils.parseEther(1)
    const transactionParameters = {
      to: '0xC3EFAbe5e6B261AbFFe6Ad07DA4c7ab775DaBa31', // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: `${amount}`, // Only required to send ether to the recipient from the initiating external account.
    };
   
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    // try{
    //   const fundMeContract = new ethers.Contract("0x596e39c428e2255437D416eB818f81ae88FD9587",Abi);
    //   await fundMeContract.addFund({value: ethers.utils.parseEther(amount)});
    // }catch(e)
    // {
    //   alert(e);
    // }
  }
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <form>
          
        </form>
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Place a Bid</h6>
        <p className="text-center text-light">
          You must bid at least <span className="money">1 ETH</span>
        </p>

        <div className="input__item mb-4">
          <input type="number"  required placeholder="00 : 00 ETH" onChange={handleAmountChange} />
        </div>

        {/* <div className="input__item mb-3">
          <h6>Enter Quantity, 7 available</h6>
          <input type="number" placeholder="Enter quantity" />
        </div> */}

        <div className=" d-flex align-items-center justify-content-between">
          <p>You must bid at least</p>
          <span className="money">5.89 ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Service Fee</p>
          <span className="money">0.89 ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Total Bid Amount</p>
          <span className="money">5.89 ETH</span>
        </div>

        <button className="place__bid-btn" onClick={sendFund} >Place a Bid</button>
      </div>
    </div>
  );
};

export default Modal;
