import styled from 'styled-components';

export default ({ onYesVote, onNoVote, question }) => (
  <PollCard>
    <DeletePollButton onClick={this.handleDeletePollClick}>+</DeletePollButton>
    <Question>{question}</Question>
    <div>
      <VoteButton onClick={onYesVote}>Sure</VoteButton>
      <VoteButton onClick={onNoVote}>No, not really.</VoteButton>
    </div>
  </PollCard>
);

const PollCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  border-radius: 6px;
  background-color: #f1f1f1;

  padding: 13rem;

  height: calc(100vh - 6rem);
  width: calc(100vw - 6rem);

  margin: 3rem auto;
`;

const Question = styled.p`
  font-size: 4.4rem;
  padding-bottom: 7.5rem;
  max-width: 65rem;
  font-weight: 900;
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

  background-color: #ee5150;

  transition: 100ms all;

  &:hover {
    cursor: pointer;
    background-color: #ef3832;
  }
`;