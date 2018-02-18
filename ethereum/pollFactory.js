import web3 from './web3';
import PollFactory from './build/PollFactory.json';

const pollFactoryAddress = '0x9B2304B5151a73f00BB4a9aBfa555B31F04756F4';

export default new web3.eth.Contract(
  JSON.parse(PollFactory.interface),
  pollFactoryAddress
);
