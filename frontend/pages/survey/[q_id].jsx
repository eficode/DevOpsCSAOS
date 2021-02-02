import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import ContentWrapper from '../../components/contentWrapper';
import Button from '../../components/button';
import Option from '../../components/option';
import getAll from '../../services/questions';

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 60px 60px; 
  column-gap: 10px;
  row-gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
`;

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
`;

export async function getStaticPaths() {
  const questions = await getAll();
  const ids = questions.map((q) => q.id);

  const paths = ids.map((id) => (
    {
      params: {
        q_id: String(id),
      },
    }
  ));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  const questions = await getAll();
  return {
    props: {
      questions,
    },
  };
}

const Question = ({ questions }) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const router = useRouter();

  const questionId = Number(router.query.q_id);
  const nextQuestionUrl = `/survey/${questionId + 1}`;
  const isLast = questionId === questions.length;

  const Buttons = isLast ? (
    <Button type="submit" onClick={() => console.log('saving!')}>
      <span>Get results!</span>
    </Button>
  ) : (
    <Button type="button">
      <Link href={nextQuestionUrl} passHref>
        <span>Next</span>
      </Link>
    </Button>
  );

  return (
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <span>
        Question
        {' '}
        {questionId}
        /
        {questions.length}
      </span>
      <QuestionTitle>{questions[questionId - 1].text}</QuestionTitle>
      <OptionsWrapper>
        <Option
          label="Strongly agree"
          selected={selectedValue === 5}
          onClick={() => setSelectedValue(5)}
        />
        <Option
          label="Agree"
          selected={selectedValue === 4}
          onClick={() => setSelectedValue(4)}
        />
        <Option
          label="Neutral"
          selected={selectedValue === 3}
          onClick={() => setSelectedValue(3)}
        />
        <Option
          label="Disagree"
          selected={selectedValue === 2}
          onClick={() => setSelectedValue(2)}
        />
        <Option
          label="Strongly disagree"
          selected={selectedValue === 1}
          onClick={() => setSelectedValue(1)}
        />
      </OptionsWrapper>
      {Buttons}
    </ContentWrapper>
  );
};

export default Question;
