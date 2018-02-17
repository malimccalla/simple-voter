import styled, { injectGlobal } from 'styled-components';
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
    const question = 'Wow! This app is super neat right?';

    return [
      <PollCard
        onYesVote={this.handleYesVote}
        onNoVote={this.handleNoVote}
        question={question}
      />,
      <CreatePollButton onClick={this.handleCreatePollClick}>
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
