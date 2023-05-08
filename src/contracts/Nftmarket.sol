//-------------------------------New contract 1/05----------------------------------by kenil

// SPDX-License-Identifier: MIT

// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// contract NFT is ERC721, ERC721Enumerable, Ownable {
//     constructor() ERC721("MyToken", "MTK") {}
//     using SafeMath for uint256;
//     uint NFT_ID = 1;
//     struct Detail {
//         uint id;
//         address nftowner;
//         string imgUrl;
//         uint nftprice;
//         string nft_title;
//         string nftDescription;
//         string nftcreator;
//     }

//     struct sellnft {
//         uint Id;
//         uint256 Price;
//         bool is_Offer;
//         uint OfferEnd; 
//     }

//     uint[] public NFTId;
    
//     uint256 public offerExpirationTime;

//     mapping(uint=>sellnft) public sellData;
//     mapping(uint=>Detail) public data;
//     mapping(address=>Detail[]) userdata;

//     event AddNFT(uint NFT_ID,string imgUrl,uint nftprice,string nft_title,string nftDescription,string nftcreator);
//     event sellNFT(address nftowner,uint offerPrice,uint offercreatedtime,uint offerended);
//     event buynft(address nftowner,address buyaddress,uint buyprice,uint buytime);
//     // uint256 public constant MINT_PRICE = 0.05 ether;


//     function safeMint(address to, uint256 tokenId) public onlyOwner {
//         _safeMint(to, tokenId);
//     }

//     // The following functions are overrides required by Solidity.

//     function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
//         internal
//         override(ERC721, ERC721Enumerable)
//     {
//         super._beforeTokenTransfer(from, to, tokenId, batchSize);
//     }

//     function supportsInterface(bytes4 interfaceId)
//         public
//         view
//         override(ERC721, ERC721Enumerable)
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }

//     function Add_nft (address _add, uint _price,string memory _title , string memory _imgUrl,string memory _des,string memory _creator ) public payable {
//         _mint(_add,NFT_ID);
//         data[NFT_ID] = Detail(NFT_ID,_add,_imgUrl,_price,_title,_des,_creator);
//         userdata[_add].push(Detail(NFT_ID,_add,_imgUrl,_price,_title,_des,_creator));
//         emit AddNFT(NFT_ID,_imgUrl,_price,_title,_des,_creator);
//         NFT_ID += 1;
//     }

//     function NFT_DATA (uint _id) public view returns(Detail memory){
//         return data[_id];
//     }


//     function IMG_URL (uint _id) public view returns(string memory){
//         return data[_id].imgUrl;
//     }

//     function SellNFT( uint _ID,uint256 _price) public {
//         require(_exists(_ID), "NFT does not exist");
//         // address nft_O = data[_ID].nftowner;
//         require(msg.sender == data[_ID].nftowner,"You are not owner of this nft");
//         // require(msg.sender == , "You do not own this NFT");
//         sellData[_ID] = sellnft(_ID,_price,true,block.timestamp);
//         offerExpirationTime = block.timestamp + 10000 minutes;
//         _approve(address(this),_ID);
//         // _isApprovedOrOwner(address(this),_ID);
//         // _setApprovalForAll(msg.sender,address(this),true);
//         NFTId.push(_ID);
//         emit sellNFT(msg.sender,_price,block.timestamp,offerExpirationTime);

//     }

//     function Cancelsell(uint _ID) public {
//         require(msg.sender == data[_ID].nftowner, "You are not the owner of this NFT");
//         require(sellData[_ID].is_Offer == true, "This NFT is not for sale");
        
//         // sellData[_ID].is_Offer = false;
//         for (uint i=0 ;i <=NFTId.length-1;i++){
//                 if(NFTId[i]==_ID){
//                     delete NFTId[i];
//                 }
//             }
//     }

//     function BuyNFT (uint _ID) public payable  {

//         for ( uint i=0 ;i <=NFTId.length-1;i++){
//             if (NFTId[i]==_ID){
//                 require(offerExpirationTime>=block.timestamp,"Offer Has Ended");
//                 // require(msg.value==sellData[_ID].Price,"Invalid value");
//                 if(offerExpirationTime<=block.timestamp){
//                     sellData[_ID].is_Offer = false;
//                     delete NFTId[0];
//                     // string memory msg = "This Offer is ended";
//                     // return msg;
//                 }
//                 else{
//                     sellData[_ID].is_Offer = true;
//                     _approve(msg.sender, _ID);
//                     address o = data[_ID].nftowner;
//                     safeTransferFrom(o,msg.sender,_ID);
//                     data[_ID].nftowner=msg.sender;
//                     payable(o).transfer(msg.value);

//                     emit buynft(o,msg.sender,sellData[_ID].Price,block.timestamp);
//                     for (uint j=0 ;j <=NFTId.length-1;j++){
//                         if(NFTId[j]==_ID){
//                             delete NFTId[j];
//                         }
//                     }
//                 }
//             }
//         else{
//             // string memory msg = "This Nft not for sale";
//             // return msg;
//         }
//         }
        
//     }

//     function Offer_ID (uint _index) public view returns(uint) {
//         return NFTId[_index];
//     }

//     function offerExpired() public view returns (bool) {
//         return (block.timestamp >= offerExpirationTime);
//     }
// }







// ================================== nft_list contract ===================================


// pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// contract NFTMarketplace {
//     struct Listing {
//         uint256 price;
//         address seller;
//     }

//     mapping(address => mapping(uint256 => Listing)) public listings;

//     modifier isNFTOwner(address nftAddress, uint256 tokenId) {
//         require(
//             IERC721(nftAddress).ownerOf(tokenId) == msg.sender,
//             "MRKT: Not the owner"
//         );
//         _;
//     }

//     modifier validPrice(uint256 _price) {
//         require(_price > 0, "MRKT: Price must be > 0");
//         _;
//     }

//     modifier isNotListed(address nftAddress, uint256 tokenId) {
//         require(
//             listings[nftAddress][tokenId].price == 0,
//             "MRKT: Already listed"
//         );
//         _;
//     }

//     modifier isListed(address nftAddress, uint256 tokenId) {
//         require(listings[nftAddress][tokenId].price > 0, "MRKT: Not listed");
//         _;
//     }

//     event ListingCreated(
//         address nftAddress,
//         uint256 tokenId,
//         uint256 price,
//         address seller
//     );

//     event ListingCancelled(address nftAddress, uint256 tokenId, address seller);

//     event ListingUpdated(
//         address nftAddress,
//         uint256 tokenId,
//         uint256 newPrice,
//         address seller
//     );

//     event ListingPurchased(
//         address nftAddress,
//         uint256 tokenId,
//         address seller,
//         address buyer
//     );

//     function createListing(
//         address nftAddress,
//         uint256 tokenId,
//         uint256 price
//     )
//         external
//         isNotListed(nftAddress, tokenId)
//         isNFTOwner(nftAddress, tokenId)
//         validPrice(price)
//     {
//         IERC721 nftContract = IERC721(nftAddress);
//         require(
//             nftContract.isApprovedForAll(msg.sender, address(this)) ||
//                 nftContract.getApproved(tokenId) == address(this),
//             "MRKT: No approval for NFT"
//         );
//         listings[nftAddress][tokenId] = Listing({
//             price: price,
//             seller: msg.sender
//         });

//         emit ListingCreated(nftAddress, tokenId, price, msg.sender);
//     }

//     function cancelListing(address nftAddress, uint256 tokenId)
//         external
//         isListed(nftAddress, tokenId)
//         isNFTOwner(nftAddress, tokenId)
//     {
//         delete listings[nftAddress][tokenId];
//         emit ListingCancelled(nftAddress, tokenId, msg.sender);
//     }

//     function updateListing(
//         address nftAddress,
//         uint256 tokenId,
//         uint256 newPrice
//     )
//         external
//         isListed(nftAddress, tokenId)
//         isNFTOwner(nftAddress, tokenId)
//         validPrice(newPrice)
//     {
//         listings[nftAddress][tokenId].price = newPrice;
//         emit ListingUpdated(nftAddress, tokenId, newPrice, msg.sender);
//     }

//     function purchaseListing(address nftAddress, uint256 tokenId)
//         external
//         payable
//         isListed(nftAddress, tokenId)
//     {
//         Listing memory listing = listings[nftAddress][tokenId];

//         require(msg.value == listing.price, "MRKT: Incorrect ETH supplied");

// 		    delete listings[nftAddress][tokenId];

//         IERC721(nftAddress).safeTransferFrom(
//             listing.seller,
//             msg.sender,
//             tokenId
//         );

//         (bool sent, ) = payable(listing.seller).call{value: msg.value}("");
//         require(sent, "Failed to transfer eth");

//         emit ListingPurchased(nftAddress, tokenId, listing.seller, msg.sender);
//     }
// }