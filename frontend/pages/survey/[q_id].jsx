import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import ContentWrapper from '../../components/contentWrapper';
import Button from '../../components/button';

const exampleData = { id: 0, text: 'Oletko kaurainen', weight: 3 };

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 60px 60px 60px; 
  column-gap: 10px;
  row-gap: 15px;
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
`;

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
`;

const NotSelectedOption = styled.button`
  background-color: ${({ theme }) => theme.colors.gold};
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.amber};
  }
`;

const SelectedOption = styled.button`
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.brandyPunch};
`;

const Option = ({ label, selected, onClick }) => {
  if (selected) {
    return (
      <SelectedOption onClick={onClick}>
        {label}
      </SelectedOption>
    );
  }

  return (
    <NotSelectedOption onClick={onClick}>
      {label}
    </NotSelectedOption>
  );
};

const Question = () => {
  const [selectedValue, setSelectedValue] = useState(0);
  const router = useRouter();
  const questionId = router.query.q_id;
  console.log('💩 ~ file: [Question].js ~ line 5 ~ router', router);
  console.log(selectedValue);

  const nextQuestionUrl = `/survey/${Number(questionId)+1}`;

  return (
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <span>
        Question
        {' '}
        {questionId}
        /1
      </span>
      <QuestionTitle>{exampleData.text}</QuestionTitle>
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
      <Button type="button">
        <Link href={nextQuestionUrl} passHref>
          <span>Next</span>
        </Link></Button>
    </ContentWrapper>
  );
};

export default Question;
