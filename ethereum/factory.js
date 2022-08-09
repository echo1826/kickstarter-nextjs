import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';
console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

const contractInstance = new web3.eth.Contract(compiledFactory.abi, '0x280486bf13b7b35A1F3095AD3A8A9272C58045Cd');

export default contractInstance;