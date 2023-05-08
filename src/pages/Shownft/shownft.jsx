import React from 'react'
import { useState,useEffect } from 'react';
import Style from './NFTCard.module.css';
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import {useRef} from 'react';
// import Image from 'next/image';
import { Link } from 'react-router-dom';

import Modal from "../../components/ui/Modal/modal_sell"
const NFTCard = (props) => {
     
    const [deatail, setdeatail] = useState()
    const [Id, setId] = useState()
    const ref = useRef(null);
    const nftimg = props.state;
    const contract= props.contract
    console.log('tyoenjbf df',typeof(n));
    console.log('nft+list------------------------------------------------',nftimg)
    const [like,setLike] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [sellnftid, setsellnftid] = useState([])
    const [fix, setfix] = useState(false)
    const Handlesort=async(event)=>{
      event.preventDefault();
      setId(event.target.value)
      setShowModal(true)
      console.log("-------------------",event.target.value);     
    }

    const Canclenft=async(event)=>{
      event.preventDefault();
      const id=event.target.value
      console.log(id);
      const cnft= await contract.Cancelsell(id)
      const cwait= await cnft.wait()
      console.log(cwait);
    }

    useEffect(() => {
      const Cancle_nft = async () => {
        
        const nft_balance = await contract.totalSupply()
        console.log("dcsed-------------------------------------------------",Number(nft_balance));
        for(var i = 0;i<=nft_balance;i++){
            const sid=await contract.NFTId(i)
            console.log("=========================",Number(sid));
            const id=Number(sid);
            if (id!=0){
                    setsellnftid([...sellnftid,id])
                    sellnftid.push(id)
            }        
        }
      } 
      Cancle_nft()

    }, [contract])
    
    console.log("+++++++++++++++++++++=",sellnftid);
    console.log(nftimg);

  

  return (
    <div className={Style.NFTCard}>
        {nftimg.map((el,i)=>(
            <div className="single__nft__card" style={(sellnftid.includes(Number(el.id)))?{border:"1px solid red"}:{}}>
            <div className="nft__img">
              <img src={el.imgUrl} alt="" className="w-100" />
            </div>
            
            <div className="nft__content">
              <h5 className="nft__title">
                <Link to={`/market/${el.id}`}>{el.nft_title}</Link>              
              </h5>
            
              <div className="creator__info-wrapper d-flex gap-3">
                {/* <div className="creator__img">
                  <img src={el} alt="" className="w-100" />
                </div> */}

                <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                  <div>
                    <h6>Created By</h6>
                    <p>{el.nftcreator}</p>
                  </div>

                  <div>
                    <h6>Current Bid</h6>
                    <p>{Number(el.nftprice)} ETH</p>
                  </div>
                  <div>
                    <h6>Token id:</h6>
                    <p>{Number(el.id)}</p>
                  </div>
                  
                </div>
                
              </div>
              <div>
                {/* {


                  // let fix=false;
                  // setfix(false)

                  sellnftid.map((matchid,j)=>{
                    console.log(matchid);
                    if(el.id ==sellnftid[j]){
                      return(
                         
                        // <button type="button"  className='btn btn-primary w-50 d-flex justify-content-center' value={el.id} onClick={Handlesort}  >Sell</button>
                      )
                      
                    }
                    else{
                      return(
                        // <button type="button"  className='btn btn-primary w-50 d-flex justify-content-center' value={el.id} onClick={Handlesort}  >Cancle</button>
                      )
                    }

                  })
                } */}

                {/* {
                  sellnftid.some(element=>{
                    if(element[i]==el.id){
                      return(
                         
                        <button type="button"  className='btn btn-primary w-50 d-flex justify-content-center' value={el.id} onClick={Handlesort}  >Sell</button>
                      )
                    }
                  })
                } */}



                {
                  // (el.id ==sellnftid[i])? 
                  // console.log(el.id)
                  (sellnftid.includes(Number(el.id)))?
                  (
                    <button type="button"  className='btn btn-warning w-50 d-flex justify-content-center' value={el.id} onClick={Canclenft}  >Cancle</button>
                  ):(
                    <button type="button"  className='btn btn-primary w-50 d-flex justify-content-center' value={el.id} onClick={Handlesort}  >Sell</button>
                  )
                }
                
              </div>
              {showModal && <Modal setShowModal={setShowModal} Id={Id} contract={contract}/>}
              <div className=" mt-3 d-flex align-items-center justify-content-between">
                {/* <button
                  className="bid__btn d-flex align-items-center gap-1"
                  type="submit"
                  // onClick={() => setShowModal(true)}
                >
                  <i class="ri-shopping-bag-line"></i> Mint
                </button> */}

                {/* {showModal && <Modal setShowModal={setShowModal} />} */}
              </div>
            </div>
          </div>
            // <div className={Style.NFTCard_box} key={i+1}>
            //     <div className={Style.NFTCard_box_img}>
            //         <img src={el.imgUrl} alt="NFT images"  className={Style.NFTCard_box_img_img} />
            //     </div>
            //     {/* {/ <Link to="/single-nft">View NFT</Link> } */}

            //     <a href="/single-nft"><button className={Style.viewNFT111}>View NFT</button></a>
                
            //     <div className={Style.NFTCard_box_update}>
            //         <div className={Style.NFTCard_box_update_left}>
            //             <div className={Style.NFTCard_box_update_left_like} onClick={()=>likeNft()}>
            //                 {/* {like ? (
            //                     <AiOutlineHeart />
            //                 ) : (
            //                     <AiFillHeart className={Style.NFTCard_box_update_left_like_icon} />
            //                 )}
            //                 {""} 22 */}
            //             </div>
            //         </div>
            //         <div className={Style.NFTCard_box_update_right}>
            //             <div className={Style.NFTCard_box_update_right_info}>
            //                 {/* <small>Remaining time</small>
            //                 <p>3h : 15m : 20s</p> */}
            //             </div>
            //         </div>
            //     </div>
            //     <div className={Style.NFTCard_box_update_details}>
            //         <div className={Style.NFTCard_box_update_details_price}>
            //             <div className={Style.NFTCard_box_update_details_price_box}>
            //                 {/* <h4>creator</h4>
            //                 <p>{el.nftcreator}</p> */}
            //                 <div className={Style.NFTCard_box_update_details_price_box_box}>
            //                     <div className={Style.NFTCard_box_update_details_price_box_bid}>
            //                         {/* <small>Current Price</small> */}
            //                         <p>{Number(el.nftprice)} ETH</p>
            //                     </div>
            //                     {/* <div className={Style.NFTCard_box_update_details_price_box_stock}>
            //                         <small>1 in stock</small>
            //                     </div> */}
            //                 </div>
            //             </div>
            //         </div>
            //         <div className={Style.NFTCard_box_update_details_category}>
            //             {/* <BsImages/> */}
            //         </div>
            //     </div>
            // </div>
        ))}
    </div>
  )
}

export default NFTCard;


