import React from 'react'
import Abi_list from "../contracts/Nft_list.json"

const Nft_list = () => {
  // 0xBb542a77B1E7593f8BFce806C9F47cbA0861240d
  const [State, setState] = useState([])

  useEffect( () => {
    const List_contract = async () => {
      const contract_add = '0xBb542a77B1E7593f8BFce806C9F47cbA0861240d';
      const contract_abi = Abi_list;
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contract_add,contract_abi,signer);
      setState({provider,signer,contract});
    }
    List_contract();
  },[]);

  const {contract} =State;
  
  const Onlick_list=async(e)=>{
    e.preventDefault();
    const tx= await contract.createListing("0xA9F0e942b6292Eb3CBaE5006B80dA28b134BF836",1,0);
    const tx_wait=await tx.wait();

  }
  

  return (
    <div>
        <input type="button" onClick={}/>
    </div>
  )
}

export default Nft_list