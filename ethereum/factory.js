import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi, '0xF1D12B8bb1e467D6a6eC294a3513868B6B01Fdb9'
);

export default instance;