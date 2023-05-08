import React, { useState, useEffect} from 'react'
import CommonSection from "../Common-section/CommonSection";
import { makeStyles ,CircularProgress} from "@material-ui/core";
import axios from "axios";
import {CryptoState} from "./CryptoContext"
import {TrendingCoins} from "./api"
import AliceCarousel from "react-alice-carousel";
import {Link} from "react-router-dom"
import Header from './Banner/Header';

const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      },
}))

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Tredingcoin = () => {
    const [loading, setloading] = useState(false)
    const [Trending, setTrending] = useState([])
    const Classes=useStyles();
     
    const { currency,symbol } = CryptoState();

    const fetchtredingcoins=async()=>{
        setloading(true)
        const {data}= await axios.get(TrendingCoins(currency))
        console.log(data);
        setTrending(data)
        setloading(false)
    }
    useEffect(() => {
        fetchtredingcoins();
    }, [currency])

    const items=Trending.map((coin)=>{
    let profit=coin.price_change_percentage_24h >=0;
    return(
        <Link  className={Classes.carouselItem} to={`https://coinmarketcap.com/currencies/${coin.id}/`}>
        <img 
        src={coin?.image} 
        alt={coin.name}
        height="80"
        style={{marginBottom:10 ,marginTop:10} } 
        /> 
        <span>
            {coin?.symbol } 
            &nbsp;
            <span
            style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}    >
             {profit && "+"}  {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
        
        </Link>
    )
})  
    
const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };
    
  return (
    <div align="center">
        <CommonSection title={"Treding Coin"} />
        <Header/>
        {
          loading?(
            <CircularProgress style={{alignItems:"center" ,color:"white", marginTop:"20px" ,marginBottom:"20px"}}/>
          ):(
            <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
          />
          )
        }
          
    </div>
  )
}

export default Tredingcoin