import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Header = styled.header``;
const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15rem;
`;

const Main = styled.main`
  padding: 5rem;
  background-color: #fff;

  p {
    text-align: center;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ContentWrapper>
        <Header>
          <Heading>DevOps Assessment Tool</Heading>
        </Header>
        <Main>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, animi repellat quaerat beatae autem
            voluptates, aperiam tenetur laudantium officiis quidem in harum recusandae suscipit quo dignissimos dolorum!
            Aspernatur, quidem blanditiis? Tempora quam sunt perspiciatis itaque, a culpa nulla, voluptatibus qui ex aut
            pariatur ut minus numquam eos dolor non totam ducimus, tempore est at temporibus repellat! Natus libero
            delectus dignissimos. Temporibus minima exercitationem odit distinctio perspiciatis consequuntur nesciunt
            accusantium necessitatibus corrupti ad. Consequuntur inventore eos molestias omnis commodi cumque tempore
            excepturi animi eveniet ipsum. Vero quam quaerat laboriosam inventore porro? Et earum atque veritatis
            maiores obcaecati. Natus dolor alias repellat porro? Earum, nisi atque quas reprehenderit a necessitatibus
            est eveniet neque assumenda dolorem aliquam cumque sapiente. Animi beatae provident quia?
          </p>
        </Main>
      </ContentWrapper>

      {/* <footer>Footer</footer> */}
    </>
  );
}
