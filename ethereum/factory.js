import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi, '0xdB8ef2f353370d43ad0eee58Cd54FF2721e7b6Ab'
);

export default instance;