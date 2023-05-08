import React,{useState,useEffect} from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../assets/data/data";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";

const NftDetails = ({state}) => {
  const { id } = useParams();
  const [Img,setImg] = useState([]);
  const [Img1,setImg1] = useState([]);

  const {contract} = state;
  const showNft=async()=>{
      //  console.log(contract);
       const showDetails= await contract.NFT_DATA(id)
       console.log(showDetails);
       setImg(showDetails)
  }
  console.log(Img);


    const Show_ownernft = async () => {
      // setloading(true)
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
              setImg1([...Img,imgurl1]);
              Img1.push(imgurl1);
          }         
      }
      // setloading(false)
    } 

  useEffect(() => {
    showNft();
    Show_ownernft();

  }, [contract])
  
  // const singleNft = NFT__DATA.find((item) => item.id === id);

  return (
    <>
      <CommonSection title={Img.title} />

      <section className="section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={Img.imgUrl}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{Img.nft_title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i class="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i class="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i class="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i class="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img src={Img.creatorImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{Img.nftcreator}</h6>
                  </div>
                </div>
                {/* <input type="textarea" value={Img.nftDescription}/> */}
                <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="des"
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      value={Img.nftDescription}
                    ></textarea>
                  </div>
                {/* <p className="my-4">{Img.nftDescription}</p> */}
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                  <i class="ri-shopping-bag-line"></i>
                  <Link to="/wallet">Place a Bid</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction Img1={Img1}/>
    </>
  );
};

export default NftDetails;
