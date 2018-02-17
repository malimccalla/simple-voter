import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // in the browser and user is running metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  // on the server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider(process.env.INFURA_INSTANCE);
  web3 = new Web3(provider);
}

export default web3;
