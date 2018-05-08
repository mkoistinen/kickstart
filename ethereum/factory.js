import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x74F07Fdc1F7ba13006Ca63c199b0DbF9477922bd'
)

export default instance;
