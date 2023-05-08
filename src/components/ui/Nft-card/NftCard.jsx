import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

import Modal from "../Modal/modal_buy";

const NftCard = (props) => {
  const { nft_title, id, currentBid,nftprice,creatorImg, imgUrl,nftcreator } = props.item;

  const [showModal, setShowModal] = useState(false);
  const [Id, setId] = useState();
  const contract= props.contract

  const Handlesort=async(event)=>{
    event.preventDefault();
    
    setId(event.target.value)
    setShowModal(true)
    console.log("-------------------",event.target.value);
    
  }
  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{nft_title}</Link>
          {/* <Link >{nft_title}</Link> */}
          {/* <h5>{Id}</h5> */}
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          {/* <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div> */}

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{nftcreator}</p>
            </div>

            <div>
              <h6>Current Bid</h6>
              <p>{Number(nftprice)} ETH</p>
            </div>
            <div>
              <h6>TokenId:</h6>
              <p>{Number(id)}</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            value={id}
            onClick={Handlesort}
          >
            <i class="ri-shopping-bag-line" ></i> Buy
          </button>

          {showModal && <Modal setShowModal={setShowModal} Id={Id} contract={contract} />}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
