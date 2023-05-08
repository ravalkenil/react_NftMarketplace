import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Container, Row, Col } from "reactstrap";
import NFTMarketplace from "../contracts/NFTMarketplace.json";



const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const init = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NFTMarketplace.networks[networkId];
      const instance = new web3.eth.Contract(
        NFTMarketplace.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);

      const allTokens = await instance.methods
        .tokensOfOwner(account)
        .call({ from: account });
      setTokens(allTokens);
    };
    init();
  }, [account]);

  const handleList = async (tokenId, price) => {
    await contract.methods.listToken(tokenId, price).send({ from: account });
    const allTokens = await contract.methods
      .tokensOfOwner(account)
      .call({ from: account });
    setTokens(allTokens);
  };

  const handleUnlist = async (tokenId) => {
    await contract.methods.unlistToken(tokenId).send({ from: account });
    const allTokens = await contract.methods
      .tokensOfOwner(account)
      .call({ from: account });
    setTokens(allTokens);
  };

  const handlePurchase = async (tokenId, price) => {
    await contract.methods
      .purchaseToken(tokenId)
      .send({ from: account, value: price });
    const allTokens = await contract.methods
      .tokensOfOwner(account)
      .call({ from: account });
    setTokens(allTokens);
  };

  return (
    <section className="section">
        <Container>
    <div className="App">
      <h1>NFT Marketplace</h1>
      <h2>My Tokens</h2>
      <ul>
        {tokens.map((tokenId) => (
          <li key={tokenId}>
            Token {tokenId}
            <button onClick={() => handleUnlist(tokenId)}>Unlist</button>
          </li>
        ))}
      </ul>
      <h2>All Tokens</h2>
      <ul>
        {tokens.map((tokenId) => (
          <li key={tokenId}>
            Token {tokenId}
            <button onClick={() => handlePurchase(tokenId, 1)}>Buy</button>
          </li>
        ))}
      </ul>
      <h2>List a Token</h2>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          const tokenId = e.target.elements.tokenId.value;
          const price = e.target.elements.price.value;
          handleList(tokenId, price);
        }}
      >
        <label>
          Token ID:
          <input type="text" name="tokenId" />
        </label>
        <label>
          Price:
          <input type="text" name="price" />
        </label>
        <button type="submit">List</button>
      </form> */}
    </div>
    </Container>
      </section>
  );
}

export default App;
