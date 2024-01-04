import React from 'react';
import { Box, Text, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import './CheckboxQuestion.css'

const RadioQuestion = ({ question, index, onAnswerSubmit }) => {
  return (
    <Box className='checkbox-container'>
      <Stack className='checkbox-stack'>
        <Text fontSize="lg">{`${index + 1}. ${question.question}`}</Text>
        <RadioGroup defaultValue="" mt={2} onChange={(e) => onAnswerSubmit(e)}>
          <Stack spacing={2} pl={4}>
            {question.options.map(option => (
              <Radio key={option._id} value={option.name}>
                {option.name}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
    </Box>
  );
};

export default RadioQuestion;
