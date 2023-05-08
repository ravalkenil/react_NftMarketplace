import React, { useState,useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

import { NFT__DATA } from "../assets/data/data";
import {CircularProgress }from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const Market = (props) => {
  const [data, setData] = useState(NFT__DATA);
  
  const handleCategory = () => {};

  const handleItems = () => {};

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "Sort By") {
      const filterData = NFT__DATA

      setData(filterData);
    } 

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };
  
  const [Img,setImg] = useState([]);
  const {contract} = props.state;
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const Show_ownernft = async () => {
      setloading(true)
      const nft_balance = await contract.totalSupply()
      // console.log(address);
      console.log("dcsed-------------------------------------------------",Number(nft_balance));
      // for(var i = 0;i<=nft_balance;i++)
      for(var i = 0;i<=nft_balance;i++){
          // const tokenId = await contract.tokenOfOwnerByIndex("0x03A25c6E4BcCD4c5F28b2F0cf62d144bC1d4a6d4",i);
          // const ID = Number(tokenId);
          const id=await contract.NFTId(i)
          console.log("=========================",Number(id));
          if (id!=0){
              const imgurl1 = await contract.NFT_DATA(id);
              const imgurl = imgurl1;
              console.log('11111111111111111111111',imgurl);
              setImg([...Img,imgurl1]);
              Img.push(imgurl1);             
          } 
          setloading(false)
          
      }
      console.log("---------------------------");
      
    } 
    Show_ownernft()
  }, [contract])

  console.log(Img);

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section className="section">
        <Container >
          {
            loading ?(
              <Container style={{textAlign:"center" , marginTop:"60px"}}>
                 <CircularProgress style={{textAlign:"center" ,color:"white", marginTop:"230px" ,marginBottom:"230px"}} />
              </Container>
             
            ):(
          
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option value="Sort By">Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>
           
            
              {
                Img?.map((item) => (
                  <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                    {/* <NftCard item={item} /> */}
                    <NftCard  state={Img} contract={contract} item={item} />
                  </Col>
                ))
              }                     
          </Row>
            )
          }
        </Container>
      </section>
    </>
  );
};

export default Market;
