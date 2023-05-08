import React, { useState,useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import Web3 from "web3";
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import { NFTStorage, File, Blob  } from 'nft.storage';
import Nft_card from "./Shownft/shownft";
import {CircularProgress} from "@material-ui/core";


// Insert css 
import NFTMarketplace from "../contracts/NFTMarketplace.json";
// import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.png";
import avatar from "../assets/images/ava-01.png";
import "../styles/create-item.css";
import { Link } from "react-router-dom";
import "../components/ui/Nft-card/nft-card.css";
import Modal from "../components/ui/Modal/Modal";
import Abi from "../contracts/Nft_abi.json"


const web3 = new Web3(Web3.givenProvider);


const Create = (props) => {
  const [NFTCard, setNFTCard] = useState({
    id: "01",
    title: "Guard",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img,
    creator: "Trista Francis",
    creatorImg: avatar,
    currentBid: 7.89,
  });
  const [showModal, setShowModal] = useState(false);
   
  const [loading, setloading] = useState(false)
  const state1=props.state

const { address, isConnecting, isDisconnected } = useAccount();
console.log('addresssssssss',address);

const [Data,setData] = useState({price:null,title:null,creator:null,des:null,_imgUrl:null});

const nft_list = [];

const { ethereum } = window;

const { contract } = state1;


const changeHandler = e => {
    setData({...Data,[e.target.name]:e.target.value});
}


function handleImangechange(e) {
    setData({
      ...Data,
      _imgUrl: e.target.files[0],
      imgUrl:URL.createObjectURL(e.target.files[0]), 
    });
} 

const nftprice = Number(Data.price);
const Mint_NFT = async (event,imag) => {
    setloading(true)
    event.preventDefault();
    const amount = Number(Data.price);
    const price = { value: ethers.utils.parseEther(`${amount}`) };

    const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFEMjAxNUFBQTA5NDYwODcyQTliNmUzQWI5MjY2ZTU2QjMwM0Q3QzUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjU3NzEyODk3MCwibmFtZSI6Ik5mdF9tYXJrZXRwbGFjZSJ9.4-NRj6IeUwT6VeaSaKTozhRKHUqAvWrIxVRcy0uXc28';
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    const imageFile = new File([Data._imgUrl] , 'nft.png', { type: 'image/png' });
    const metaData = await client.store({
      name: Data.title,
      description : Data.des,
      image : imageFile,
      price : Data.price,
      creator : Data.creator
    });
    const imgurl1 = metaData.data.image.pathname;
    const i = imgurl1.replace('/nft.png','.ipfs.dweb.link/nft.png');
    const url = i.replace('//','https://');
    const someData = new Blob([Data]);
    const cid = await client.storeBlob(someData);
    const mint_token = await contract.Add_nft(address,nftprice,Data.title,url,Data.des,Data.creator);
    const a = await mint_token.wait();
    console.log("wait",a);
    setloading(false)
}


// const Show_ownernft = async () => {

//   const nft_balance = await contract.balanceOf(address);
//   for(var i = 0;i<nft_balance;i++){
//       const tokenId = await contract.tokenOfOwnerByIndex(address,i);
//       const ID = Number(tokenId);
//       const imgurl1 = await contract.NFT_DATA(ID);
//       const imgurl = imgurl1;
//       console.log('11111111111111111111111',imgurl);
//       setImg([...Img,imgurl1]);
//       Img.push(imgurl1);
//   }
// }

  return (
    <>
      <CommonSection title="Create Item" />

      <section className="section">

     <Container>
          <Row>
          
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <div className="single__nft__card">
                <div className="nft__img">
                  <img src={Data.imgUrl} alt="" className="w-100" />
                </div>

                <div className="nft__content">
                  <h5 className="nft__title">
                    <Link to={`/market/${NFTCard.id}`}>{Data.title}</Link>
                  </h5>

                  <div className="creator__info-wrapper d-flex gap-3">
                    <div className="creator__img">
                      <img src={Data.creatorImg} alt="" className="w-100" />
                    </div>

                    <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                      <div>
                        <h6>Created By</h6>
                        <p>{Data.creator}</p>
                      </div>

                      <div>
                        <h6>Current Bid</h6>
                        <p>{Data.price} ETH</p>
                      </div>
                    </div>
                  </div>

                  <div className=" mt-3 d-flex align-items-center justify-content-between">
                    {/* <button
                      className="bid__btn d-flex align-items-center gap-1"
                      type="submit"
                      // onClick={() => setShowModal(true)}
                    >
                      <i class="ri-shopping-bag-line"></i> Mint
                    </button> */}

                    {showModal && <Modal setShowModal={setShowModal} />}
                  </div>
                </div>
              </div>
            </Col>

            {
              loading ?(
                <Col lg="9" md="8" sm="6">
                  <div className="position-absolute top-50 start-50">
                      <CircularProgress style={{alignItems:"center" ,color:"white", marginTop:"70px" ,marginBottom:"200px"}}/>
                  </div>                   
                </Col>                              
              ):(
            <Col lg="9" md="8" sm="6">
              <form onSubmit={Mint_NFT}>
                <div className="create__item">
               
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" onChange={handleImangechange} className="upload__input" required/>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" onChange={changeHandler}  name="title" placeholder="Enter title" required/>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Creator</label>
                    <input type="text"  onChange={changeHandler} name="creator"  placeholder="Enter title" required />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input type="number" onChange={changeHandler}   name="price" placeholder="Enter price" required />
                  </div>            

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="des"
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={changeHandler}
                    ></textarea>
                  </div>
                  <button
                      className="bid__btn d-flex align-items-center gap-1"
                      type="submit"
                      // onClick={() => setShowModal(true)}
                    >
                      <i class="ri-shopping-bag-line"></i> Mint
                  </button>
              </div>
              </form>
            </Col>
              )
            }
           
          </Row>
        </Container> 
        {/* <Nft_card state={Img}/> */}
      </section>
    </>
  );
};

export default Create;
