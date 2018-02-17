import web3 from './web3';
import PollFactory from './build/PollFactory.json';

const pollFactoryAddress = '0xbf61C917719176f6618678832adecB4Cf0A88985';

export default new web3.eth.Contract(
  JSON.parse(PollFactory.interface),
  pollFactoryAddress
);
