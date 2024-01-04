import React from 'react';
import { Box, Text, Checkbox, Stack } from '@chakra-ui/react';
import './CheckboxQuestion.css'

const CheckboxQuestion = ({ question, index, onAnswerSubmit }) => {
  return (
    <Box className='checkbox-container'>
      <Stack className='checkbox-stack'>
        <Text fontSize="lg">{`${index + 1}. ${question.question}`}</Text>
        <Stack spacing={2} pl={4}>
          {question.options.map(option => (
            <Checkbox key={option._id} value={option.name} onChange={(e) => onAnswerSubmit(option.name)}>
              {option.name}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CheckboxQuestion;
