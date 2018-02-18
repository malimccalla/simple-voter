import styled from 'styled-components';
import React, { Component } from 'react';

import pollInstance from '../ethereum/poll';
import web3 from '../ethereum/web3';

export default class extends Component {
  state = { loading: true };

  componentDidMount() {
    this.refetchDetails();
  }

  async refetchDetails() {
    const [account] = await web3.eth.getAccounts();

    const poll = await pollInstance(this.props.address)
      .methods.getDetails()
      .call({ from: account });

    this.setState({
      loading: false,
      mining: false,
      address: this.props.address,
      creator: poll[0],
      question: poll[1],
      yesButtonText: poll[2],
      noButtonText: poll[3],
      yesVotesCount: poll[4],
      noVotesCount: poll[5],
      hasVoted: poll[6],
    });
  }

  onYesVote = async () => {
    this.setState({ ...this.state, mining: true });

    try {
      const [account] = await web3.eth.getAccounts();
      await pollInstance(this.state.address)
        .methods.voteYes()
        .send({ from: account });
    } catch (e) {
      console.log('ERROR In eth stuff', e);
    }

    this.refetchDetails();
  };

  onNoVote = async () => {
    this.setState({ ...this.state, mining: true });

    try {
      const [account] = await web3.eth.getAccounts();
      await pollInstance(this.state.address)
        .methods.voteNo()
        .send({ from: account });
    } catch (e) {
      console.log('ERROR In eth stuff', e);
    }

    this.refetchDetails();
  };

  render() {
    if (this.state.loading) return <PollCard />;
    const {
      mining,
      creator,
      question,
      yesButtonText,
      noButtonText,
      yesVotesCount,
      noVotesCount,
      hasVoted,
    } = this.state;

    return (
      <PollCard>
        <DeletePollButton onClick={() => this.props.handleDelete(creator)}>
          +
        </DeletePollButton>
        <Question>{question}</Question>
        {hasVoted ? (
          <Results>
            <Result>{`${yesButtonText} - ${yesVotesCount}`}</Result>
            <Result>{`${noButtonText} - ${noVotesCount}`}</Result>
          </Results>
        ) : (
          <Buttons>
            <VoteButton onClick={this.onYesVote}>{yesButtonText}</VoteButton>
            <VoteButton onClick={this.onNoVote}>{noButtonText}</VoteButton>
          </Buttons>
        )}
        {mining ? (
          <Status>Please wait while your request is handled...</Status>
        ) : null}
      </PollCard>
    );
  }
}

const Pie = () => (
  <VictoryPie
    data={[{ x: 'Cats', y: 35 }, { x: 'Dogs', y: 40 }, { x: 'Birds', y: 55 }]}
  />
);

const Results = styled.div`
  display: block;
`;

const Buttons = styled.div``;

const Status = styled.span`
  font-size: 1.4rem;
  margin-top: 2rem;

  font-weight: 300;
`;

const Result = styled.div`
  padding-bottom: 1rem;
  font-weight: 300;
  font-size: 2rem;
`;

const PollCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  border-radius: 6px;
  background-color: #f1f1f1;

  padding: 13rem;

  height: calc(95vh - 6rem);
  width: calc(100vw - 6rem);

  margin: 3rem auto;
`;

const Question = styled.p`
  font-size: 4.4rem;
  margin: 7.5rem 0;
  max-width: 65rem;
  font-weight: 800;
`;

const DeletePollButton = styled.button`
  border: none;
  outline: none;
  position: absolute;
  background-color: transparent;

  color: #999;

  font-size: 5rem;
  top: 1.5rem;
  left: 3.5rem;
  font-weight: 300;

  transform: rotate(45deg);

  transition: 100ms all;

  &:hover {
    color: #000;
    cursor: pointer;
  }
`;

const VoteButton = styled.button`
  height: 6rem;
  width: 18rem;
  color: white;
  border-radius: 6px;
  margin-right: 3rem;
  border: none;
  font-weight: 400;
  font-size: 1.4rem;

  outline: none;

  background-color: #ee5150;

  transition: 300ms all;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(1);
  }
`;
