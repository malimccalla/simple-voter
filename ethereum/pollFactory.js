import web3 from './web3';
import PollFactory from './build/PollFactory.json';

const pollFactoryAddress = '0xb2A9158923b81B4552F984C6774fb729f9e4bdb5';

export default new web3.eth.Contract(
  JSON.parse(PollFactory.interface),
  pollFactoryAddress
);
