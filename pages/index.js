import styled from 'styled-components';
import React, { Component } from 'react';

import PollCard from '../components/PollCard';

class App extends Component {
  handleCreatePollClick = () => {
    console.log('create poll');
  };

  handleDeletePollClick = () => {
    console.log('delete poll');
  };

  handleYesVote = () => console.log('voted yes');
  handleNoVote = () => console.log('voted no');

  render() {
    return [
      <PollCard>
        <DeletePollButton onClick={this.handleDeletePollClick}>
          +
        </DeletePollButton>
        <Title>Simple Poll</Title>
        <Question>Wow! This app is super neat right?</Question>
        <div>
          <VoteButton onClick={this.handleYesVote}>Sure</VoteButton>
          <VoteButton onClick={this.handleNoVote}>No, not really.</VoteButton>
        </div>
      </PollCard>,
      <CreatePollButton onClick={this.handleCreatePollClick}>
        +
      </CreatePollButton>,
    ];
  }
}

export default App;

const Title = styled.h1`
  font-size: 4.8rem;
  padding-bottom: 4rem;
  font-weight: 900;
`;

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

const DeletePollButton = styled.button`
  border: none;
  outline: none;
  position: absolute;
  background-color: transparent;

  color: #999;

  font-size: 4rem;
  top: 2rem;
  left: 3.5rem;

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

  background-color: #ee5150;

  transition: 100ms all;

  &:hover {
    cursor: pointer;
    background-color: #ef3832;
  }
`;

const Question = styled.p`
  font-size: 3.2rem;
  font-weight: 300;
  padding-bottom: 13rem;
`;
