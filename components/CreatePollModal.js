import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

class CreatePollModal extends Component {
  state = { question: '', noButtonText: '', yesButtonText: '' };

  render() {
    return (
      <Modal
        contentLabel="loginModal"
        shouldCloseOnOverlayClick
        onRequestClose={this.props.close}
        isOpen={this.props.visible}
      >
        <Content>
          <Close onClick={this.props.close}>+</Close>
          <Title>Create New Poll</Title>
          <InputGroup width="100%">
            <Label>Question*</Label>
            <Input
              maxLength={50}
              onChange={e => this.setState({ question: e.target.value })}
              value={this.state.question}
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
                value={this.state.yesButtonText}
              />
            </InputGroup>
            <InputGroup width="48%">
              <Label>Option 2*</Label>
              <Input
                maxLength={20}
                placeholder="No"
                onChange={e => this.setState({ noButtonText: e.target.value })}
                value={this.state.noButtonText}
              />
            </InputGroup>
          </ButtonInputs>
          <Buttons>
            <Button>Create Poll</Button>
          </Buttons>
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

const Label = styled.label`
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const Buttons = styled.div`
  display: flex;
`;

const InputGroup = styled.div`
  width: ${props => props.width};
`;

const Button = styled.button`
  height: 7rem;
  flex: 1;

  background-color: #ee5150;
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
