import React,{useEffect,useState} from "react";
import { Container, Row, Col } from "reactstrap";

import { NFT__DATA } from "../../../assets/data/data";
import "./trending.css";
import {CircularProgress }from "@material-ui/core";
import NftCard from "../Nft-card/NftCard";

const Trending = (props) => {
   
  const {contract} = props.state
  const [Img,setImg] = useState([]);
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const Show_ownernft = async () => {
      setloading(true)
      const nft_balance = await contract.totalSupply()
      console.log("dcsed",nft_balance);
      for(var i = 0;i<=nft_balance;i++){
          const imgurl1 = await contract.NFT_DATA(i);
          const imgurl = imgurl1;
          console.log('11111111111111111111111',imgurl);
          setImg([...Img,imgurl1]);
          Img.push(imgurl1);
      }
      setloading(false)
    } 
    Show_ownernft()
  }, [contract])
  return (
    <section className="section">
      <Container>
      <Row>
      <Col lg="12" className="mb-5">
        <h3 className="trending__title">Trending</h3>
      </Col>
        {
          loading?(
             <Container style={{textAlign:"center" , marginTop:"60px"}}>
              <CircularProgress style={{textAlign:"center" ,color:"white", marginTop:"230px" ,marginBottom:"230px"}} />
            </Container>
          ):(
              Img.slice(1, 8).map((item) => (
                <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
                  <NftCard item={item} />
                </Col>
              ))       
          )
        }
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
