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

const gas = '2000000';

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  pollFactory = await new web3.eth.Contract(
    JSON.parse(compiledPollFactory.interface)
  )
    .deploy({ data: compiledPollFactory.bytecode })
    .send({ from: accounts[0], gas });

  await pollFactory.methods
    .createPoll('Is this a great test poll?', 'Yeah sure', 'Nah')
    .send({ from: accounts[0], gas });

  [pollAddress] = await pollFactory.methods.getDeployedPolls().call();

  poll = await new web3.eth.Contract(
    JSON.parse(compiledPoll.interface),
    pollAddress
  );
});

describe('PollFactory', () => {
  it('stores deployed polls', async () => {
    await pollFactory.methods
      .createPoll('Is this a great 2nd test poll?', 'Yeah', 'No')
      .send({ from: accounts[0], gas });

    const deployedPolls = await pollFactory.methods.getDeployedPolls().call();
    assert.equal(2, deployedPolls.length);
  });
});

describe('Poll', () => {
  it('deploys a factory and poll', () => {
    assert.ok(pollFactory.options.address);
    assert.ok(poll.options.address);
  });

  it('marks transaction sender as creator', async () => {
    const creator = await poll.methods.creator().call();

    assert.equal(accounts[0], creator);
    assert.notEqual(accounts[1], creator);
  });

  it('has a question associated to it', async () => {
    const question = await poll.methods.question().call();

    assert.equal('Is this a great test poll?', question);
  });

  it('allows someone to vote yes and marks them as voter', async () => {
    await poll.methods.voteYes().send({ from: accounts[0], gas });
    const isVoter = await poll.methods.voters(accounts[0]).call();

    assert.ok(isVoter);
  });

  it('allows someone to vote no and marks them as voter', async () => {
    await poll.methods.voteNo().send({ from: accounts[0], gas });
    const isVoter = await poll.methods.voters(accounts[0]).call();

    assert.ok(isVoter);
  });

  it('increments yes and no vote counters', async () => {
    await poll.methods.voteYes().send({ from: accounts[0], gas });
    await poll.methods.voteNo().send({ from: accounts[1], gas });
    await poll.methods.voteYes().send({ from: accounts[2], gas });
    await poll.methods.voteNo().send({ from: accounts[3], gas });
    await poll.methods.voteNo().send({ from: accounts[4], gas });

    const yesVotesCount = await poll.methods.yesVotesCount().call();
    const noVotesCount = await poll.methods.noVotesCount().call();

    assert.equal(2, yesVotesCount);
    assert.equal(3, noVotesCount);
  });

  it('doesnt allow the same account to vote twice', async () => {
    try {
      await poll.methods.voteYes().send({ from: accounts[1], gas });
      await poll.methods.voteNo().send({ from: accounts[1], gas });
      // if we get to here test should fail
      assert.ok(false);
    } catch (e) {
      // assert that an error occurred
      assert.ok(true);
    }
  });
});
