import React, { useEffect,useState} from 'react'
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import Nft_card from "./Shownft/shownft";
import { useAccount } from 'wagmi';
import {CircularProgress }from "@material-ui/core";



const Mynft = (props) => {
   
  const [Img,setImg] = useState([]);
  const State1=props.state
  const {contract} =State1;
  const { address, isConnecting, isDisconnected } = useAccount();
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const Show_ownernft = async () => {
      setloading(true)
      const nft_balance = await contract.balanceOf(address);
      console.log(address);
      console.log("dcsed",nft_balance);
      for(var i = 0;i<nft_balance;i++){
          const tokenId = await contract.tokenOfOwnerByIndex(address,i);
          const ID = Number(tokenId);
          const imgurl1 = await contract.NFT_DATA(ID);
          const imgurl = imgurl1;
          console.log('11111111111111111111111',imgurl);
          setImg([...Img,imgurl1]);
          Img.push(imgurl1);
      }
      setloading(false)
    } 
    Show_ownernft()
  }, [State1])
  
  
  return (
    <div>
        <CommonSection title="My Nfts" />
        <section className="section">
          <Container>
              {
                loading? (
                  <Container style={{textAlign:"center" , marginTop:"60px"}}>
                      <CircularProgress style={{textAlign:"center" ,color:"white", marginTop:"230px" ,marginBottom:"230px"}} />
                  </Container>
                ):(
                  <Nft_card state={Img} contract={contract}/>
                )
              }
              
          </Container>
        </section>
    </div>
  )
}

export default Mynft