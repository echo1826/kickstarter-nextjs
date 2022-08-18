import web3 from './web3';
import compiledCampaign from './build/Campaign.json';

function campaignConstructor(address) {
    return new web3.eth.Contract(compiledCampaign.abi, address);
}

export default campaignConstructor;