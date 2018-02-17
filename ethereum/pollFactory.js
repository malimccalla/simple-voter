import web3 from './web3';
import PollFactory from './build/PollFactory.json';

const pollFactoryAddress = '0x4Ae8d375eb1f156d9E84e92e43eB4Be0Ae9DEDF7';

export default new web3.eth.Contract(
  JSON.parse(PollFactory.interface),
  pollFactoryAddress
);
