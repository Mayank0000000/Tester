import React, { useState } from 'react';
import { Box, Text, Input,Stack } from '@chakra-ui/react';

const InputQuestion = ({ question, index, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');
  const handleChange = (e) => {
    setAnswer(e.target.value);
    onAnswerSubmit(e.target.value);
  };
  return (
    <Box p={4} borderWidth="1px" borderRadius="md"  display="flex" alignItems="flex-start" textAlign='start'>
      <Stack spacing={2}>
        <Text fontSize="lg">{`${index + 1}. ${question.question}`}</Text>
        <Input value={answer}   onChange={handleChange}/>
      </Stack>
    </Box>
  );
};

export default InputQuestion;
