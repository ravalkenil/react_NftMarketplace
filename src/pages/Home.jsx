import React from "react";
import HeroSection from "../components/ui/HeroSection";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import GiftCard from "../components/ui/Gift-Card/GiftCard"

const Home = (props) => {
  const State=props.state
  return (
    <>
      <HeroSection />
      <SellerSection />
      <Trending state={State}/>
      <GiftCard/>
    </>
  );
};

export default Home;
