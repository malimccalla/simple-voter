import styled, { injectGlobal } from 'styled-components';
import React, { Component } from 'react';

import web3 from '../ethereum/web3';
import pollFactoryInstance from '../ethereum/pollFactory';
import pollInstance from '../ethereum/poll';
import PollCard from '../components/PollCard';

class App extends Component {
  static async getInitialProps() {
    const pollAddresses = await pollFactoryInstance.methods
      .getDeployedPolls()
      .call();

    const pollsPromise = pollAddresses.map(async address => {
      const poll = await pollInstance(address)
        .methods.getDetails()
        .call();

      return {
        address,
        creator: poll[0],
        question: poll[1],
        yesVotesCount: poll[2],
        noVotesCount: poll[3],
      };
    });

    const polls = await Promise.all(pollsPromise);

    return { polls };
  }

  handleCreatePollClick = () => {
    console.log('create poll');
  };

  handleDelete = async (creator, index) => {
    const [account] = await web3.eth.getAccounts();
    console.log(creator, account);

    if (creator !== account) {
      console.warn(`only the creator (${creator}) can delete this poll`);
    } else {
      console.log('Delete poll');
    }
  };

  handleYesVote = async address => {
    const [account] = await web3.eth.getAccounts();

    await pollInstance(address)
      .methods.voteYes()
      .send({ from: account });
  };

  handleNoVote = async address => {
    const [account] = await web3.eth.getAccounts();

    await pollInstance(address)
      .methods.voteNo()
      .send({ from: account });
  };

  render() {
    const { polls } = this.props;
    console.log(polls);

    const pollCards = polls.map((poll, i) => (
      <PollCard
        key={poll.address}
        question={poll.question}
        onYesVote={() => this.handleYesVote(poll.address)}
        onNoVote={() => this.handleNoVote(poll.address)}
        onDelete={() => this.handleDelete(poll.creator, i)}
      />
    ));

    return [
      ...pollCards,
      <CreatePollButton key="key" onClick={this.handleCreatePollClick}>
        +
      </CreatePollButton>,
    ];
  }
}

const CreatePollButton = styled.button`
  height: 6rem;
  width: 6rem;
  box-shadow: 10px 17px 62px -2px rgba(0, 0, 0, 0.25);

  background-color: #ee5150;
  position: fixed;

  border-radius: 500px;

  border: none;
  outline: none;

  bottom: 6rem;
  right: 6rem;
  font-weight: 300;
  color: white;
  transition: 300ms;

  &:hover {
    transform: scale(1.05);
    box-shadow: 10px 17px 62px 2px rgba(0, 0, 0, 0.2);

    cursor: pointer;
  }

  &:active {
    transform: scale(1);
  }
`;

injectGlobal`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    vertical-align: middle;
    font-family: inherit;
    box-sizing: inherit;
    font-weight: inherit;
  }
  ul {
    list-style: none;
  }
  html {
    font-size: 62.5%;
  }
  button {
    font-family: sans-serif;
    font-size: 1.6rem;
  }
  body {
    color: #111111;
    font-family: sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.4px;
    box-sizing: border-box;
  }
`;

export default App;
