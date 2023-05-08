
import React,{useEffect,useState} from "react";
import "./modal.css";
import Abi from "../../../contracts/Abi.json";
import { Container, Row, Col } from "reactstrap";

// import {fundMe} from "../ABIs/fundMe.js";
import { ethers } from 'ethers';
import {CircularProgress }from "@material-ui/core";

// import { fetchSigner } from '@wagmi/core';



const modal_buy = ({setShowModal,Id ,contract}) => {
  
  const [price, setprice] = useState()
  const [loading, setloading] = useState(false)
  const shownftprice=async()=>{
     const data1=await contract.sellData(Id);
     setprice(Number(data1.Price)/1000000000000000000);
    //  setprice(0)
     console.log(Number(data1.Price));
  } 
  
  useEffect(() => {
    shownftprice()
  }, [contract])
  
  const Buynft=async(e)=>{
     e.preventDefault();
     setloading(true);
     console.log(Id);
     console.log(contract);
     const options = {value: ethers.utils.parseEther(`${price}`)}
     const tx= await contract.BuyNFT(Id,options)
     const waittx= await tx.wait()
     console.log("this is txwait",waittx);
     setloading(false)
     setShowModal(false)
     console.log("fdsf");
  }
  return (
    <div className="modal__wrapper">
        <div className="single__modal">
          
            <span className="close__modal">
              <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
            </span>
            {
              loading ?(
                <Container style={{textAlign:"center" , marginTop:"30px"}}>
                    <CircularProgress style={{textAlign:"center" ,color:"white", marginTop:"150px" ,marginBottom:"230px"}} />
                </Container>
              ):(
                <form onSubmit={Buynft}>
                  <h6 className="text-center text-light">Buy NFT</h6>
                  <p className="text-center text-light">
                    This is Buy Amount
                  </p>
                  
                  <div className="input__item mb-4">
                    <input type="number"  value={price} required/>
                  </div>
                
                <button className="place__bid-btn" type="submit">Buy</button>
              </form>
              )
            }
          
      </div>
     </div>
  )
}

export default modal_buy
