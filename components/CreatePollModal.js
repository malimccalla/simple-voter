import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

class CreatePollModal extends Component {
  state = { question: '', yesButtonText: '', noButtonText: '' };

  handleClose = () => {
    this.setState({ question: '', yesButtonText: '', noButtonText: '' });
    this.props.close();
  };

  handleCreateNewPoll = () => {
    const { question, yesButtonText, noButtonText } = this.state;
    this.props.createNewPoll(question, yesButtonText, noButtonText);
    this.setState({ question: '', yesButtonText: '', noButtonText: '' });
  };

  render() {
    const { question, yesButtonText, noButtonText } = this.state;
    const { visible, mining } = this.props;

    return (
      <Modal
        contentLabel="loginModal"
        shouldCloseOnOverlayClick
        onRequestClose={this.handleClose}
        isOpen={visible}
      >
        <Content>
          <Close onClick={this.handleClose}>+</Close>
          <Title>Create New Poll</Title>
          <InputGroup width="100%">
            <Label>Question*</Label>
            <Input
              maxLength={50}
              onChange={e => this.setState({ question: e.target.value })}
              value={question}
              placeholder="Ask a question"
            />
          </InputGroup>
          <ButtonInputs>
            <InputGroup width="48%">
              <Label>Option 1*</Label>
              <Input
                maxLength={20}
                placeholder="Yes"
                onChange={e => this.setState({ yesButtonText: e.target.value })}
                value={yesButtonText}
              />
            </InputGroup>
            <InputGroup width="48%">
              <Label>Option 2*</Label>
              <Input
                maxLength={20}
                placeholder="No"
                onChange={e => this.setState({ noButtonText: e.target.value })}
                value={noButtonText}
              />
            </InputGroup>
          </ButtonInputs>
          <Buttons>
            <Button
              disabled={!question || !yesButtonText || !noButtonText}
              onClick={this.handleCreateNewPoll}
            >
              Create Poll
            </Button>
          </Buttons>
          {mining ? (
            <Status>
              Please wait while your request is handled... This modal will close
              automatically once the current block has been mined.
            </Status>
          ) : null}
        </Content>
      </Modal>
    );
  }
}

const Close = styled.button`
  border: none;
  font-size: 4rem;
  font-weight: 300;
  position: absolute;
  background-color: transparent;

  right: 3rem;
  top: 2rem;

  outline: none;

  color: #999;

  &:hover {
    color: #111;
    cursor: pointer;
  }

  transform: rotate(45deg);
`;

const Status = styled.span`
  font-size: 1.4rem;
  margin-top: 2rem;

  font-weight: 300;
`;

const Label = styled.label`
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const Buttons = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  width: ${props => props.width};
`;

const Button = styled.button`
  background-color: ${props => (props.disabled ? '#999' : '#ee5150')};
  height: 7rem;
  flex: 1;

  border: none;

  border-radius: 6px;
  color: white;

  font-weight: 400;
  margin-top: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  padding-bottom: 3.5rem;
  font-size: 2.8rem;

  font-weight: 800;
`;

const ButtonInputs = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  height: 6rem;
  border-radius: 6px;
  flex: 1;
  width: 100%;

  font-size: 1.8rem;
  font-weight: 400;

  border: 1px solid #ccc;
  padding-left: 2rem;
  margin-top: 1rem;
`;

const Content = styled.div`
  width: 100%;
`;

Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    width: '60rem',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '3rem 6rem 3rem 6rem',
  },
};

// https://github.com/reactjs/react-modal/issues/576 use ariaHideApp={false} to hide
// used to hide main app element for screen readers and only show modal content
if (typeof window !== 'undefined') {
  // only set app element if in browser
  Modal.setAppElement('#__next');
}

export default CreatePollModal;
