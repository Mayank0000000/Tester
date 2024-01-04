import React, { useState } from 'react';
import { Box, Text, Input, Stack } from '@chakra-ui/react';
import './CheckboxQuestion.css'

const InputQuestion = ({ question, index, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');
  const handleChange = (e) => {
    setAnswer(e.target.value);
    onAnswerSubmit(e.target.value);
  };
  return (
    <Box p={4} className='checkbox-container' textAlign='start'>
      <Stack className='checkbox-stack'>
        <Text fontSize="lg">{`${index + 1}. ${question.question}`}</Text>
        <Input value={answer} onChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default InputQuestion;
