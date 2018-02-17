import styled from 'styled-components';

import Layout from '../components/Layout';

export default () => [
  <Layout>
    <Title>Simple Voter</Title>
    <Question>This is a question. Do you agree?</Question>
    <div>
      <button>yes</button>
      <button>no</button>
    </div>
  </Layout>,
];

const Title = styled.h1`
  font-size: 4.8rem;
  padding-bottom: 4rem;
  font-weight: 900;
`;

const Question = styled.p`
  font-size: 3.2rem;
  font-weight: 300;
  padding-bottom: 13rem;
`;
