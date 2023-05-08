import React from "react";

import "./modal.css";
import Abi from "../../../contracts/Abi.json";
import { Container, Row, Col } from "reactstrap";

// import {fundMe} from "../ABIs/fundMe.js";
import { ethers } from 'ethers';
// import { fetchSigner } from '@wagmi/core';
import { useState } from "react";
import {CircularProgress }from "@material-ui/core";

const modal_sell = ({setShowModal,Id ,contract}) => {

    // const setShowModal= props.setShowModal;
    // const Id =props.setShowModal;
    // const {setShowModal,Id} =Alldata;
    // const [amount,setAmount] = useState("");
    // console.log("css");
    // const handleAmountChange = (e) =>{
    //   console.log(e.target.value);
    //   setAmount(e.target.value*1000000000000000)
    // }
    // const sendFund = async()=>{
    //   const {ethereum}= window;
    //   console.log("this is",amount);
  
    //   // const amount=ethers.utils.parseEther(1)
    //   const transactionParameters = {
    //     to: '0xC3EFAbe5e6B261AbFFe6Ad07DA4c7ab775DaBa31', // Required except during contract publications.
    //     from: ethereum.selectedAddress, // must match user's active address.
    //     value: `${amount}`, // Only required to send ether to the recipient from the initiating external account.
    //   };
     
    //   await ethereum.request({
    //     method: 'eth_sendTransaction',
    //     params: [transactionParameters],
    //   });
    const [price, setprice] = useState()
    const [loading, setloading] = useState(false)
    // }
    const sellnft=async(e)=>{
          setloading(true)
          e.preventDefault();
          console.log("This is show model",Id);
          const price1=price*1000000000000000000;
          console.log(Number(price1));
          const Tx=await contract.SellNFT(Id,price1)
          const waittx=await Tx.wait();
          console.log(waittx);
          setloading(false)
          setShowModal(false)
    }
    return (
      <div className="modal__wrapper">
        <div className="single__modal">
            
            <span className="close__modal">
              <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
            </span>
          {
            loading ?(
              <Container style={{textAlign:"center" , marginTop:"60px"}}>
                      <CircularProgress style={{textAlign:"center" ,color:"white", marginTop:"150px" ,marginBottom:"230px"}} />
              </Container>
            ):(
              <form onSubmit={sellnft}>
                <h6 className="text-center text-light">Sell NFT</h6>
                <p className="text-center text-light">
                  Please Enter a Selling Price
                </p>
                
                <div className="input__item mb-4">
                  <input type="number" step="0.000000001" onChange={(e)=>{setprice(e.target.value)}} placeholder="00 : 00 ETH" required/>
                </div>
              
              <button className="place__bid-btn" type="submit">Place a Bid</button>
            </form>
            )
          }
          
      </div>
     </div>
    );
}

export default modal_sell