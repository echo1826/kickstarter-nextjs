import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const contractInstance = new web3.eth.Contract(compiledFactory.abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

export default contractInstance;