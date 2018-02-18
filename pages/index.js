import styled, { injectGlobal } from 'styled-components';
import React, { Component } from 'react';

import web3 from '../ethereum/web3';
import pollFactoryInstance from '../ethereum/pollFactory';
import pollInstance from '../ethereum/poll';

import CreatePollModal from '../components/CreatePollModal';
import PollCard from '../components/PollCard';

class App extends Component {
  state = { modalVisible: false, polls: [], mining: false };

  componentDidMount() {
    this.fetchPolls();
  }

  async fetchPolls() {
    const polls = await pollFactoryInstance.methods.getDeployedPolls().call();
    this.setState({ polls });
  }

  handleDelete = async (creator, i) => {
    const [account] = await web3.eth.getAccounts();
    console.log(creator, account);

    if (creator !== account) {
      window.alert(
        `Only the creator of this poll can delete it.\n\nCreator: ${creator}\nYou: ${account}`
      );
    } else {
      const result = window.confirm(
        'Are you sure you want to delete this poll?'
      );

      if (result) {
        window.alert(
          "Well this is awkward... Since a blockchain is immutable you can't technically delete a poll."
        );
      }
    }
  };

  getVotedStatus = async address => {
    const [account] = await web3.eth.getAccounts();

    const status = await pollInstance(address)
      .methods.voters(account)
      .call();

    return status;
  };

  createNewPoll = async (question, yesButtonText, noButtonText) => {
    this.setState({ mining: true });
    const [account] = await web3.eth.getAccounts();

    try {
      await pollFactoryInstance.methods
        .createPoll(question, yesButtonText, noButtonText)
        .send({ from: account });

      this.fetchPolls();
      this.setState({ modalVisible: false, mining: false });
    } catch (e) {
      console.log('Something went wrong :(');
      this.setState({ mining: false });
    }
  };

  render() {
    const { polls } = this.state;
    return (
      <div>
        {polls.map(address => (
          <PollCard
            handleDelete={this.handleDelete}
            key={address}
            address={address}
          />
        ))}
        <CreatePollButton
          key="key"
          onClick={() => this.setState({ modalVisible: true })}
        >
          +
        </CreatePollButton>
        <CreatePollModal
          close={() => this.setState({ modalVisible: false })}
          visible={this.state.modalVisible}
          createNewPoll={this.createNewPoll}
          mining={this.state.mining}
        />
      </div>
    );
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
    font-family: 'Muli', sans-serif;
    font-size: 1.6rem;
  }
  body {
    color: #111111;
    font-family: 'Muli', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.4px;
    box-sizing: border-box;
  }
`;

export default App;
