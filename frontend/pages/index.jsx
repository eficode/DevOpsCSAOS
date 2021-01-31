/* eslint-disable max-len */
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';

import ContentWrapper from '../components/contentWrapper';

const Header = styled.header``;
const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`;

const Main = styled.main`
  padding: 5rem;
  background-color: #fff;

  p {
    text-align: center;
    line-height: 1.6;
    padding: 0.5rem;
  }

  button {
    padding: 1rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`;

const Home = () => (
  <>
    <Head>
      <title>DevOps Capability Survey</title>
    </Head>
    <ContentWrapper>
      <Header>
        <Heading>DevOps Assessment Tool</Heading>
      </Header>
      <Main>
        <p>Welcome!</p>
        <p>Test yout DevOps capabilities here.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, animi repellat quaerat beatae autem
          voluptates, aperiam tenetur laudantium officiis quidem in harum recusandae suscipit quo dignissimos dolorum!
          Aspernatur, quidem blanditiis? Tempora quam sunt perspiciatis itaque, a culpa nulla, voluptatibus qui ex aut
          pariatur ut minus numquam eos dolor non totam ducimus, tempore est at temporibus repellat! Natus libero
          delectus dignissimos.
        </p>
      </Main>

      <button type="button">
        <Link href="/survey/question/0" passHref>
          <span>Get started</span>
        </Link>
      </button>
    </ContentWrapper>

    {/* <footer>Footer</footer> */}
  </>
);

export default Home;
