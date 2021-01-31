import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const example_data = {id:0, text:'Oletko kaurainen', weight:3};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15rem;
`;

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 60px 60px 60px; 
  column-gap: 10px;
  row-gap: 15px;
`

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
`;

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const NotSelectedOption = styled.button`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.gold};
`

const SelectedOption = styled.button`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.brandyPunch};
`

const Option = ({ label, selected, onClick }) => {
  if (selected) {
    return (
      <SelectedOption onClick={onClick}>
        {label}
      </SelectedOption>
    )
  } else {
    return (
      <NotSelectedOption onClick={onClick}>
        {label}
      </NotSelectedOption>
    )
  }
}

const Question = () => {
  const [selectedValue, setSelectedValue] = useState(0);
  const router = useRouter();
  const questionId = router.query.Question;
  console.log('💩 ~ file: [Question].js ~ line 5 ~ router', router);
  console.log(selectedValue);

  return (
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <span>Question {questionId}/1 </span>
      <QuestionTitle>{example_data.text}</QuestionTitle>
      <OptionsWrapper>
        <Option
          label='Strongly agree'
          selected={selectedValue === 5}
          onClick={() => setSelectedValue(5)}
        />
        <Option
          label='Agree'
          selected={selectedValue === 4}
          onClick={() => setSelectedValue(4)}
        />
        <Option
          label='Neutral'
          selected={selectedValue === 3}
          onClick={() => setSelectedValue(3)}
        />
        <Option
          label='Disagree'
          selected={selectedValue === 2}
          onClick={() => setSelectedValue(2)}
        />
        <Option
          label='Strongly disagree'
          selected={selectedValue === 1}
          onClick={() => setSelectedValue(1)}
        />
      </OptionsWrapper>
    </ContentWrapper>);
};

export default Question;
