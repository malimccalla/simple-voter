const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const compiledPollFactory = require('../build/PollFactory.json');
const compiledPoll = require('../build/Poll.json');

let accounts;
let pollFactory;
let pollAddress;
let poll;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  pollFactory = await new web3.eth.Contract(
    JSON.parse(compiledPollFactory.interface)
  )
    .deploy({ data: compiledPollFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('factory', pollFactory);
});

describe('Poll', () => {
  it('runs tests', () => {
    assert.ok(true);
  });
});
